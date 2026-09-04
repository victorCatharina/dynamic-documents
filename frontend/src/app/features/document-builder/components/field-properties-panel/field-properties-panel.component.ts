import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import {
  DocumentTemplateField,
  FieldInputModeEnum,
  FieldTypeEnum,
} from '../../../../core/models/template.model';

@Component({
  selector: 'app-field-properties-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  template: `
    @if (selectedField(); as field) {
      <div class="properties-panel">
        <div class="panel-header">
          <div class="header-title">
            <mat-icon color="primary">settings</mat-icon>
            <span>Propriedades do Campo</span>
          </div>
          <button mat-icon-button (click)="close()" matTooltip="Fechar painel">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="panel-scroll-content">
          <!-- Accordion de Seções -->
          <mat-accordion multi="true">
            <!-- 1. Identificação Geral -->
            <mat-expansion-panel [expanded]="true">
              <mat-expansion-panel-header>
                <mat-panel-title>Geral</mat-panel-title>
              </mat-expansion-panel-header>

              <div class="form-grid">
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Rótulo (Label)</mat-label>
                  <input
                    matInput
                    [ngModel]="field.label"
                    (ngModelChange)="updateProp('label', $event)"
                    [disabled]="facade.isReadOnly()"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Chave Identificadora (Key)</mat-label>
                  <input
                    matInput
                    [ngModel]="field.key"
                    (ngModelChange)="onKeyChange($event)"
                    [disabled]="facade.isReadOnly()"
                    class="font-mono"
                  />
                  <mat-hint>Utilizada para preenchimento via API/JSON</mat-hint>
                </mat-form-field>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Tipo do Campo</mat-label>
                  <mat-select
                    [ngModel]="field.type"
                    (ngModelChange)="updateProp('type', $event)"
                    [disabled]="facade.isReadOnly()"
                  >
                    <mat-option value="TEXT">Texto (String)</mat-option>
                    <mat-option value="NUMBER">Número</mat-option>
                    <mat-option value="DATE">Data</mat-option>
                    <mat-option value="IMAGE">Imagem (URL)</mat-option>
                    <mat-option value="FILE">Arquivo (URL)</mat-option>
                  </mat-select>
                </mat-form-field>

                <div class="input-mode-section">
                  <label class="section-sublabel">Modo de Entrada</label>
                  <mat-button-toggle-group
                    [ngModel]="field.inputMode"
                    (ngModelChange)="updateProp('inputMode', $event)"
                    [disabled]="facade.isReadOnly()"
                    class="w-full mode-toggle"
                  >
                    <mat-button-toggle value="MANUAL">
                      <mat-icon>edit_document</mat-icon>
                      Manual (Público)
                    </mat-button-toggle>
                    <mat-button-toggle value="INTEGRATION">
                      <mat-icon>api</mat-icon>
                      Integração (API)
                    </mat-button-toggle>
                  </mat-button-toggle-group>

                  @if (field.inputMode === 'INTEGRATION') {
                    <div class="integration-notice">
                      <mat-icon>info</mat-icon>
                      <span>Este campo é preenchido exclusivamente via API e não aparecerá no formulário público.</span>
                    </div>
                  }
                </div>
              </div>
            </mat-expansion-panel>

            <!-- 2. Posição & Dimensões (em pt) -->
            <mat-expansion-panel [expanded]="true">
              <mat-expansion-panel-header>
                <mat-panel-title>Posição & Tamanho (pt)</mat-panel-title>
              </mat-expansion-panel-header>

              <div class="dim-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Posição X</mat-label>
                  <input
                    matInput
                    type="number"
                    [ngModel]="field.position.x"
                    (ngModelChange)="updatePosition('x', $event)"
                    [disabled]="facade.isReadOnly()"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Posição Y</mat-label>
                  <input
                    matInput
                    type="number"
                    [ngModel]="field.position.y"
                    (ngModelChange)="updatePosition('y', $event)"
                    [disabled]="facade.isReadOnly()"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Largura</mat-label>
                  <input
                    matInput
                    type="number"
                    [ngModel]="field.position.width"
                    (ngModelChange)="updatePosition('width', $event)"
                    [disabled]="facade.isReadOnly()"
                  />
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Altura</mat-label>
                  <input
                    matInput
                    type="number"
                    [ngModel]="field.position.height"
                    (ngModelChange)="updatePosition('height', $event)"
                    [disabled]="facade.isReadOnly()"
                  />
                </mat-form-field>
              </div>
            </mat-expansion-panel>

            <!-- 3. Aparência & Tipografia -->
            <mat-expansion-panel [expanded]="true">
              <mat-expansion-panel-header>
                <mat-panel-title>Tipografia & Aparência</mat-panel-title>
              </mat-expansion-panel-header>

              <div class="form-grid">
                <div class="font-row">
                  <mat-form-field appearance="outline" class="font-family-field">
                    <mat-label>Fonte</mat-label>
                    <mat-select
                      [ngModel]="field.style?.fontFamily || 'Helvetica'"
                      (ngModelChange)="updateStyle('fontFamily', $event)"
                      [disabled]="facade.isReadOnly()"
                    >
                      <mat-option value="Helvetica">Helvetica</mat-option>
                      <mat-option value="Times-Roman">Times New Roman</mat-option>
                      <mat-option value="Courier">Courier</mat-option>
                      <mat-option value="Inter">Inter</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="font-size-field">
                    <mat-label>Tam. (pt)</mat-label>
                    <input
                      matInput
                      type="number"
                      [ngModel]="field.style?.fontSize || 12"
                      (ngModelChange)="updateStyle('fontSize', $event)"
                      [disabled]="facade.isReadOnly()"
                    />
                  </mat-form-field>
                </div>

                <!-- Formatting Toggles & Color -->
                <div class="style-toolbar">
                  <mat-button-toggle-group
                    multiple="true"
                    [disabled]="facade.isReadOnly()"
                    class="format-toggles"
                  >
                    <mat-button-toggle
                      [checked]="field.style?.bold"
                      (change)="updateStyle('bold', $event.source.checked)"
                      matTooltip="Negrito"
                    >
                      <mat-icon>format_bold</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle
                      [checked]="field.style?.italic"
                      (change)="updateStyle('italic', $event.source.checked)"
                      matTooltip="Itálico"
                    >
                      <mat-icon>format_italic</mat-icon>
                    </mat-button-toggle>
                    <mat-button-toggle
                      [checked]="field.style?.underline"
                      (change)="updateStyle('underline', $event.source.checked)"
                      matTooltip="Sublinhado"
                    >
                      <mat-icon>format_underlined</mat-icon>
                    </mat-button-toggle>
                  </mat-button-toggle-group>

                  <div class="color-picker-wrapper">
                    <input
                      type="color"
                      [ngModel]="field.style?.color || '#000000'"
                      (ngModelChange)="updateStyle('color', $event)"
                      [disabled]="facade.isReadOnly()"
                      class="color-input"
                    />
                  </div>
                </div>

                <!-- Alignment Controls -->
                <div class="align-toolbar">
                  <label class="section-sublabel">Alinhamento Horizontal</label>
                  <mat-button-toggle-group
                    [ngModel]="field.style?.alignment || 'LEFT'"
                    (ngModelChange)="updateStyle('alignment', $event)"
                    [disabled]="facade.isReadOnly()"
                    class="w-full"
                  >
                    <mat-button-toggle value="LEFT"><mat-icon>format_align_left</mat-icon></mat-button-toggle>
                    <mat-button-toggle value="CENTER"><mat-icon>format_align_center</mat-icon></mat-button-toggle>
                    <mat-button-toggle value="RIGHT"><mat-icon>format_align_right</mat-icon></mat-button-toggle>
                  </mat-button-toggle-group>
                </div>
              </div>
            </mat-expansion-panel>

            <!-- 4. Validação & Máscara -->
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Validação & Máscara</mat-panel-title>
              </mat-expansion-panel-header>

              <div class="form-grid">
                <mat-checkbox
                  [ngModel]="field.validation?.required"
                  (ngModelChange)="updateValidation('required', $event)"
                  [disabled]="facade.isReadOnly()"
                  color="primary"
                >
                  Campo Obrigatório
                </mat-checkbox>

                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Máscara Visual</mat-label>
                  <mat-select
                    [ngModel]="field.mask"
                    (ngModelChange)="updateProp('mask', $event)"
                    [disabled]="facade.isReadOnly()"
                  >
                    <mat-option [value]="null">Nenhuma</mat-option>
                    <mat-option value="CPF">CPF (000.000.000-00)</mat-option>
                    <mat-option value="CNPJ">CNPJ (00.000.000/0000-00)</mat-option>
                    <mat-option value="PHONE">Telefone ((00) 00000-0000)</mat-option>
                    <mat-option value="CEP">CEP (00000-000)</mat-option>
                    <mat-option value="DATE">Data (DD/MM/AAAA)</mat-option>
                  </mat-select>
                </mat-form-field>

                @if (field.type === 'TEXT') {
                  <div class="dim-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Min Length</mat-label>
                      <input
                        matInput
                        type="number"
                        [ngModel]="field.validation?.minLength"
                        (ngModelChange)="updateValidation('minLength', $event)"
                        [disabled]="facade.isReadOnly()"
                      />
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Max Length</mat-label>
                      <input
                        matInput
                        type="number"
                        [ngModel]="field.validation?.maxLength"
                        (ngModelChange)="updateValidation('maxLength', $event)"
                        [disabled]="facade.isReadOnly()"
                      />
                    </mat-form-field>
                  </div>
                }

                @if (field.type === 'NUMBER') {
                  <div class="dim-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Valor Mínimo</mat-label>
                      <input
                        matInput
                        type="number"
                        [ngModel]="field.validation?.min"
                        (ngModelChange)="updateValidation('min', $event)"
                        [disabled]="facade.isReadOnly()"
                      />
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Valor Máximo</mat-label>
                      <input
                        matInput
                        type="number"
                        [ngModel]="field.validation?.max"
                        (ngModelChange)="updateValidation('max', $event)"
                        [disabled]="facade.isReadOnly()"
                      />
                    </mat-form-field>
                  </div>
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Casas Decimais</mat-label>
                    <input
                      matInput
                      type="number"
                      [ngModel]="field.validation?.decimalPlaces"
                      (ngModelChange)="updateValidation('decimalPlaces', $event)"
                      [disabled]="facade.isReadOnly()"
                    />
                  </mat-form-field>
                }
              </div>
            </mat-expansion-panel>
          </mat-accordion>

          <!-- Action Buttons -->
          @if (!facade.isReadOnly()) {
            <div class="panel-bottom-actions">
              <button mat-stroked-button (click)="duplicate()" class="action-btn">
                <mat-icon>content_copy</mat-icon>
                Duplicar Campo
              </button>
              <button mat-flat-button color="warn" (click)="delete()" class="action-btn">
                <mat-icon>delete</mat-icon>
                Excluir Campo
              </button>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      .properties-panel {
        width: 320px;
        background: #ffffff;
        border-left: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 56px);
      }

      .panel-header {
        padding: 12px 16px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 0.95rem;
        color: #0f172a;
      }

      .panel-scroll-content {
        flex: 1;
        overflow-y: auto;
        padding-bottom: 24px;
      }

      .form-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
      }

      .dim-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        padding: 8px 0;
      }

      .w-full {
        width: 100%;
      }

      .section-sublabel {
        font-size: 0.775rem;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 4px;
        display: block;
      }

      .input-mode-section {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 8px;
      }

      .mode-toggle {
        display: flex;
        mat-button-toggle {
          flex: 1;
        }
      }

      .integration-notice {
        display: flex;
        gap: 6px;
        background: #f5f3ff;
        border: 1px solid #ddd6fe;
        color: #6d28d9;
        padding: 8px 10px;
        border-radius: 6px;
        font-size: 0.75rem;
        line-height: 1.4;

        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
      }

      .font-row {
        display: flex;
        gap: 8px;
      }

      .font-family-field {
        flex: 2;
      }

      .font-size-field {
        flex: 1;
      }

      .style-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .format-toggles {
        flex: 1;
      }

      .color-picker-wrapper {
        width: 40px;
        height: 38px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .color-input {
        width: 48px;
        height: 48px;
        border: none;
        cursor: pointer;
        padding: 0;
        background: transparent;
      }

      .align-toolbar {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .panel-bottom-actions {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .action-btn {
        width: 100%;
        height: 40px;
        border-radius: 6px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    `,
  ],
})
export class FieldPropertiesPanelComponent {
  readonly facade = inject(DocumentBuilderFacade);
  readonly selectedField = this.facade.selectedField;

  close(): void {
    this.facade.selectField(null);
  }

  updateProp(key: keyof DocumentTemplateField, value: unknown): void {
    const field = this.selectedField();
    if (!field) return;
    this.facade.updateField(field.id, { [key]: value });
  }

  onKeyChange(newKey: string): void {
    const field = this.selectedField();
    if (!field) return;
    const sanitized = newKey.replace(/[^a-zA-Z0-9_.]/g, '');
    this.facade.updateField(field.id, { key: sanitized });
  }

  updatePosition(coord: 'x' | 'y' | 'width' | 'height', val: number): void {
    const field = this.selectedField();
    if (!field) return;
    const num = Number(val) || 0;
    if (coord === 'x' || coord === 'y') {
      this.facade.moveField(field.id, {
        x: coord === 'x' ? num : field.position.x,
        y: coord === 'y' ? num : field.position.y,
      });
    } else {
      this.facade.resizeField(field.id, {
        width: coord === 'width' ? num : field.position.width,
        height: coord === 'height' ? num : field.position.height,
      });
    }
  }

  updateStyle(key: string, value: unknown): void {
    const field = this.selectedField();
    if (!field) return;
    this.facade.updateFieldStyle(field.id, { [key]: value });
  }

  updateValidation(key: string, value: unknown): void {
    const field = this.selectedField();
    if (!field) return;
    this.facade.updateFieldValidation(field.id, { [key]: value });
  }

  duplicate(): void {
    const field = this.selectedField();
    if (field) this.facade.duplicateField(field.id);
  }

  delete(): void {
    const field = this.selectedField();
    if (field) this.facade.removeField(field.id);
  }
}
