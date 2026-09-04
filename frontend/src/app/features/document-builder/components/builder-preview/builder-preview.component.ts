import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { CoordinateService } from '../../../../core/services/coordinate.service';

@Component({
  selector: 'app-builder-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="preview-overlay">
      <div class="preview-topbar">
        <div class="preview-title">
          <mat-icon>visibility</mat-icon>
          <span>Visualização Prévia do Template ({{ facade.document()?.name }})</span>
        </div>
        <button mat-flat-button color="primary" (click)="facade.togglePreview()">
          <mat-icon>edit</mat-icon>
          Voltar para Edição
        </button>
      </div>

      <div class="preview-viewport">
        <div class="preview-workspace">
          @for (page of facade.template().pages; track page.number) {
            <div class="preview-page-container">
              <span class="page-tag">Página {{ page.number }}</span>
              <div
                class="preview-page-sheet"
                [style.width.px]="getPageWidth(page.number)"
                [style.height.px]="getPageHeight(page.number)"
              >
                <!-- Background -->
                @if (page.background?.url) {
                  <div
                    class="preview-background"
                    [style.background-image]="'url(' + page.background?.url + ')'"
                  ></div>
                }

                <!-- Fields -->
                <div class="preview-fields">
                  @for (field of page.fields; track field.id) {
                    <div
                      class="preview-field-item"
                      [style.left.px]="coord.ptToPx(field.position.x)"
                      [style.top.px]="coord.ptToPx(field.position.y)"
                      [style.width.px]="coord.ptToPx(field.position.width)"
                      [style.height.px]="coord.ptToPx(field.position.height)"
                      [style.font-family]="field.style?.fontFamily || 'Helvetica'"
                      [style.font-size.px]="coord.ptToPx(field.style?.fontSize || 12)"
                      [style.color]="field.style?.color || '#000000'"
                      [style.font-weight]="field.style?.bold ? 'bold' : 'normal'"
                      [style.font-style]="field.style?.italic ? 'italic' : 'normal'"
                      [style.text-decoration]="field.style?.underline ? 'underline' : 'none'"
                      [style.text-align]="(field.style?.alignment || 'LEFT').toLowerCase()"
                    >
                      <span class="field-val">[{{ field.label || field.key }}]</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .preview-overlay {
        position: fixed;
        inset: 0;
        background: #0f172a;
        z-index: 1000;
        display: flex;
        flex-direction: column;
      }

      .preview-topbar {
        height: 56px;
        background: #1e293b;
        border-bottom: 1px solid #334155;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .preview-title {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #f8fafc;
        font-weight: 600;
        font-size: 0.95rem;

        mat-icon {
          color: #38bdf8;
        }
      }

      .preview-viewport {
        flex: 1;
        overflow-y: auto;
        padding: 40px 20px;
        display: flex;
        justify-content: center;
      }

      .preview-workspace {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
      }

      .preview-page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .page-tag {
        color: #94a3b8;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .preview-page-sheet {
        position: relative;
        background: #ffffff;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        border-radius: 2px;
        overflow: hidden;
      }

      .preview-background {
        position: absolute;
        inset: 0;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }

      .preview-fields {
        position: absolute;
        inset: 0;
      }

      .preview-field-item {
        position: absolute;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }

      .field-val {
        color: #2563eb;
        background: rgba(239, 246, 255, 0.7);
        padding: 1px 4px;
        border-radius: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    `,
  ],
})
export class BuilderPreviewComponent {
  readonly facade = inject(DocumentBuilderFacade);
  readonly coord = inject(CoordinateService);

  getPageWidth(pageNumber: number): number {
    const pageConfig = this.facade.template().page;
    return this.coord.getPageDimensionsPx(pageConfig, 1).width;
  }

  getPageHeight(pageNumber: number): number {
    const pageConfig = this.facade.template().page;
    return this.coord.getPageDimensionsPx(pageConfig, 1).height;
  }
}
