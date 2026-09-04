import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { CustomFieldApiService } from '../../../../core/api/custom-field-api.service';
import { CustomFieldDefinition } from '../../../../core/models/custom-field.model';
import { FieldTypeEnum } from '../../../../core/models/template.model';

interface PaletteTool {
  type: FieldTypeEnum;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-field-palette',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <div class="palette-panel">
      <div class="palette-header">
        <span class="palette-title">Campos e Componentes</span>
      </div>

      <mat-tab-group animationDuration="150ms" class="palette-tabs">
        <!-- Padrões -->
        <mat-tab label="Básicos">
          <div class="tools-list">
            @for (tool of standardTools; track tool.type) {
              <div
                class="tool-item"
                [class.disabled]="facade.isReadOnly()"
                (click)="addStandardField(tool.type)"
                matTooltip="Clique para adicionar à página ativa"
              >
                <div class="tool-icon">
                  <mat-icon>{{ tool.icon }}</mat-icon>
                </div>
                <div class="tool-info">
                  <span class="tool-label">{{ tool.label }}</span>
                  <span class="tool-desc">{{ tool.description }}</span>
                </div>
                <mat-icon class="add-icon">add_circle_outline</mat-icon>
              </div>
            }
          </div>
        </mat-tab>

        <!-- Catálogo de Custom Fields -->
        <mat-tab label="Personalizados">
          <div class="tools-list">
            @if (isLoadingCustom()) {
              <div class="loading-state">
                <span>Carregando catálogo...</span>
              </div>
            } @else if (customFields().length === 0) {
              <div class="empty-state">
                <mat-icon>tune</mat-icon>
                <p>Nenhum campo personalizado cadastrado.</p>
              </div>
            } @else {
              @for (cf of customFields(); track cf.id) {
                <div
                  class="tool-item custom-field-item"
                  [class.disabled]="facade.isReadOnly()"
                  (click)="addCustomField(cf)"
                  matTooltip="Clique para inserir no documento"
                >
                  <div class="tool-icon custom">
                    <mat-icon>{{ getIconForType(cf.type) }}</mat-icon>
                  </div>
                  <div class="tool-info">
                    <div class="custom-title-row">
                      <span class="tool-label">{{ cf.label }}</span>
                      <span
                        class="badge"
                        [class.badge-integration]="cf.inputMode === 'INTEGRATION'"
                        [class.badge-manual]="cf.inputMode === 'MANUAL'"
                      >
                        {{ cf.inputMode === 'INTEGRATION' ? 'API' : 'Manual' }}
                      </span>
                    </div>
                    <code class="tool-key">{{ cf.key }}</code>
                  </div>
                  <mat-icon class="add-icon">add</mat-icon>
                </div>
              }
            }
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .palette-panel {
        width: 280px;
        background: #ffffff;
        border-right: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 56px);
      }

      .palette-header {
        padding: 14px 16px;
        border-bottom: 1px solid #f1f5f9;
      }

      .palette-title {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #64748b;
      }

      .palette-tabs {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .tools-list {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
        height: calc(100vh - 120px);
      }

      .tool-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover:not(.disabled) {
          background: #eff6ff;
          border-color: #93c5fd;
          transform: translateY(-1px);

          .add-icon {
            color: #2563eb;
            opacity: 1;
          }
        }

        &.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .tool-icon {
        width: 34px;
        height: 34px;
        border-radius: 6px;
        background: #e2e8f0;
        color: #334155;
        display: flex;
        align-items: center;
        justify-content: center;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }

        &.custom {
          background: #f5f3ff;
          color: #7c3aed;
        }
      }

      .tool-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow: hidden;
      }

      .tool-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: #0f172a;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tool-desc {
        font-size: 0.75rem;
        color: #64748b;
      }

      .custom-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
      }

      .tool-key {
        font-size: 0.725rem;
        color: #64748b;
        font-family: 'Roboto Mono', monospace;
      }

      .add-icon {
        color: #94a3b8;
        font-size: 18px;
        width: 18px;
        height: 18px;
        opacity: 0.6;
        transition: all 0.15s ease;
      }

      .loading-state, .empty-state {
        padding: 32px 16px;
        text-align: center;
        color: #94a3b8;
        font-size: 0.85rem;

        mat-icon {
          font-size: 32px;
          width: 32px;
          height: 32px;
          margin-bottom: 8px;
        }
      }
    `,
  ],
})
export class FieldPaletteComponent implements OnInit {
  readonly facade = inject(DocumentBuilderFacade);
  private readonly customFieldApi = inject(CustomFieldApiService);

  readonly customFields = signal<CustomFieldDefinition[]>([]);
  readonly isLoadingCustom = signal<boolean>(false);

  readonly standardTools: PaletteTool[] = [
    { type: 'TEXT', label: 'Texto', icon: 'title', description: 'Nomes, observações e textos' },
    { type: 'NUMBER', label: 'Número', icon: 'pin', description: 'Valores, moedas e contagens' },
    { type: 'DATE', label: 'Data', icon: 'event', description: 'Datas e prazos' },
    { type: 'IMAGE', label: 'Imagem', icon: 'image', description: 'Logos e fotos via URL' },
    { type: 'FILE', label: 'Arquivo', icon: 'attach_file', description: 'Anexos e referências' },
  ];

  ngOnInit(): void {
    this.loadCustomFields();
  }

  loadCustomFields(): void {
    this.isLoadingCustom.set(true);
    this.customFieldApi.getCustomFields().subscribe({
      next: (fields) => {
        this.customFields.set(fields);
        this.isLoadingCustom.set(false);
      },
      error: () => {
        this.isLoadingCustom.set(false);
      },
    });
  }

  addStandardField(type: FieldTypeEnum): void {
    this.facade.addField(type);
  }

  addCustomField(cf: CustomFieldDefinition): void {
    this.facade.addField(cf.type, {
      key: cf.key,
      label: cf.label,
      inputMode: cf.inputMode,
      validation: typeof cf.validation === 'object' ? (cf.validation as any) : undefined,
    });
  }

  getIconForType(type: FieldTypeEnum): string {
    switch (type) {
      case 'TEXT':
        return 'title';
      case 'NUMBER':
        return 'pin';
      case 'DATE':
        return 'event';
      case 'IMAGE':
        return 'image';
      case 'FILE':
        return 'attach_file';
      default:
        return 'text_fields';
    }
  }
}
