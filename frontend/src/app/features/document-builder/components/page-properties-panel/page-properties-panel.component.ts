import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import {
  PageOrientationType,
  PageSizeType,
} from '../../../../core/models/template.model';

@Component({
  selector: 'app-page-properties-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  template: `
    <div class="properties-panel">
      <div class="panel-header">
        <div class="header-title">
          <mat-icon color="primary">description</mat-icon>
          <span>Configurações do Documento</span>
        </div>
      </div>

      <div class="panel-scroll-content">
        <mat-accordion multi="true">
          <!-- 1. Formato da Página -->
          <mat-expansion-panel [expanded]="true">
            <mat-expansion-panel-header>
              <mat-panel-title>Dimensões & Orientação</mat-panel-title>
            </mat-expansion-panel-header>

            <div class="form-grid">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Tamanho da Folha</mat-label>
                <mat-select
                  [ngModel]="facade.template().page.size"
                  (ngModelChange)="updatePageSize($event)"
                  [disabled]="facade.isReadOnly()"
                >
                  <mat-option value="A4">A4 (210 × 297 mm)</mat-option>
                  <mat-option value="A5">A5 (148 × 210 mm)</mat-option>
                  <mat-option value="LETTER">Carta / Letter (8.5 × 11 in)</mat-option>
                  <mat-option value="LEGAL">Ofício / Legal (8.5 × 14 in)</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="orientation-section">
                <label class="section-sublabel">Orientação</label>
                <mat-button-toggle-group
                  [ngModel]="facade.template().page.orientation"
                  (ngModelChange)="updateOrientation($event)"
                  [disabled]="facade.isReadOnly()"
                  class="w-full"
                >
                  <mat-button-toggle value="PORTRAIT">
                    <mat-icon>portrait</mat-icon>
                    Retrato
                  </mat-button-toggle>
                  <mat-button-toggle value="LANDSCAPE">
                    <mat-icon>landscape</mat-icon>
                    Paisagem
                  </mat-button-toggle>
                </mat-button-toggle-group>
              </div>
            </div>
          </mat-expansion-panel>

          <!-- 2. Estrutura de Páginas -->
          <mat-expansion-panel [expanded]="true">
            <mat-expansion-panel-header>
              <mat-panel-title>Páginas ({{ facade.template().pages.length }})</mat-panel-title>
            </mat-expansion-panel-header>

            <div class="pages-list">
              @for (p of facade.template().pages; track p.number) {
                <div
                  class="page-nav-item"
                  [class.active]="facade.selectedPageNumber() === p.number"
                  (click)="facade.selectPage(p.number)"
                >
                  <div class="page-nav-info">
                    <mat-icon>article</mat-icon>
                    <span>Página {{ p.number }}</span>
                    <span class="field-counter">{{ p.fields.length }} campos</span>
                  </div>
                  @if (!facade.isReadOnly() && facade.template().pages.length > 1) {
                    <button
                      mat-icon-button
                      (click)="removePage(p.number, $event)"
                      matTooltip="Remover página"
                      class="remove-btn"
                    >
                      <mat-icon>delete_outline</mat-icon>
                    </button>
                  }
                </div>
              }

              @if (!facade.isReadOnly()) {
                <button
                  mat-stroked-button
                  color="primary"
                  (click)="facade.addPage()"
                  class="add-page-btn"
                >
                  <mat-icon>add</mat-icon>
                  Nova Página
                </button>
              }
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
    </div>
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
        padding: 14px 16px;
        border-bottom: 1px solid #e2e8f0;
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
        gap: 12px;
        padding: 8px 0;
      }

      .w-full {
        width: 100%;
      }

      .section-sublabel {
        font-size: 0.775rem;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 6px;
        display: block;
      }

      .orientation-section {
        display: flex;
        flex-direction: column;
      }

      .pages-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px 0;
      }

      .page-nav-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }

        &.active {
          background: #eff6ff;
          border-color: #2563eb;
          font-weight: 600;

          .page-nav-info {
            color: #2563eb;
          }
        }
      }

      .page-nav-info {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.875rem;
        color: #334155;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      .field-counter {
        font-size: 0.75rem;
        color: #64748b;
        background: #e2e8f0;
        padding: 1px 6px;
        border-radius: 4px;
        margin-left: 4px;
      }

      .remove-btn {
        width: 24px;
        height: 24px;
        line-height: 24px;
        color: #94a3b8;

        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }

        &:hover {
          color: #dc2626;
        }
      }

      .add-page-btn {
        margin-top: 8px;
        width: 100%;
        height: 38px;
        font-weight: 600;
        border-radius: 6px;
      }
    `,
  ],
})
export class PagePropertiesPanelComponent {
  readonly facade = inject(DocumentBuilderFacade);

  updatePageSize(size: PageSizeType): void {
    this.facade.setPageConfig({
      ...this.facade.template().page,
      size,
    });
  }

  updateOrientation(orientation: PageOrientationType): void {
    this.facade.setPageConfig({
      ...this.facade.template().page,
      orientation,
    });
  }

  removePage(pageNum: number, event: MouseEvent): void {
    event.stopPropagation();
    this.facade.removePage(pageNum);
  }
}
