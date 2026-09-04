import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { CoordinateService } from '../../../../core/services/coordinate.service';
import { DocumentTemplatePage } from '../../../../core/models/template.model';
import { DocumentFieldComponent } from '../document-field/document-field.component';

@Component({
  selector: 'app-document-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, DocumentFieldComponent],
  template: `
    <div class="page-wrapper">
      <!-- Page Top Controls -->
      <div class="page-header-bar">
        <span class="page-indicator">Página {{ page().number }}</span>
        @if (!facade.isReadOnly()) {
          <div class="page-actions">
            <button
              mat-icon-button
              (click)="removePage()"
              [disabled]="facade.template().pages.length <= 1"
              matTooltip="Excluir página"
              class="page-btn delete"
            >
              <mat-icon>delete_outline</mat-icon>
            </button>
          </div>
        }
      </div>

      <!-- Page Sheet (Real Scale Canvas) -->
      <div
        class="page-sheet"
        [style.width.px]="pageDimensions().width"
        [style.height.px]="pageDimensions().height"
        (click)="onPageClick($event)"
      >
        <!-- Background Layer -->
        @if (page().background?.url) {
          <div
            class="page-background"
            [style.background-image]="'url(' + page().background?.url + ')'"
          ></div>
        }

        <!-- Fields Layer -->
        <div class="fields-container">
          @for (field of page().fields; track field.id) {
            <app-document-field [field]="field"></app-document-field>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
      }

      .page-header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 100%;
        padding: 4px 8px;
        margin-bottom: 8px;
      }

      .page-indicator {
        font-size: 0.8rem;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .page-actions {
        display: flex;
        gap: 4px;
      }

      .page-btn {
        width: 28px;
        height: 28px;
        line-height: 28px;
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

      .page-sheet {
        position: relative;
        background: #ffffff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.06);
        border-radius: 2px;
        overflow: hidden;
        transition: width 0.1s ease, height 0.1s ease;
      }

      .page-background {
        position: absolute;
        inset: 0;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        pointer-events: none;
        z-index: 1;
      }

      .fields-container {
        position: absolute;
        inset: 0;
        z-index: 5;
      }
    `,
  ],
})
export class DocumentPageComponent {
  readonly page = input.required<DocumentTemplatePage>();
  readonly facade = inject(DocumentBuilderFacade);
  readonly coord = inject(CoordinateService);

  readonly pageDimensions = computed(() => {
    const pageConfig = this.facade.template().page;
    const zoom = this.facade.zoom();
    return this.coord.getPageDimensionsPx(pageConfig, zoom);
  });

  onPageClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('page-sheet') || (event.target as HTMLElement).classList.contains('fields-container')) {
      this.facade.selectField(null);
    }
  }

  removePage(): void {
    this.facade.removePage(this.page().number);
  }
}
