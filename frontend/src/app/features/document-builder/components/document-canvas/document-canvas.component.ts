import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { DocumentPageComponent } from '../document-page/document-page.component';

@Component({
  selector: 'app-document-canvas',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, DocumentPageComponent],
  template: `
    <div class="canvas-viewport" (click)="onCanvasClick($event)">
      <div class="canvas-workspace">
        @for (page of facade.template().pages; track page.number) {
          <app-document-page [page]="page"></app-document-page>
        }

        <!-- Add Page Button -->
        @if (!facade.isReadOnly()) {
          <div class="add-page-container">
            <button
              mat-stroked-button
              color="primary"
              (click)="facade.addPage()"
              class="add-page-btn"
            >
              <mat-icon>add</mat-icon>
              Adicionar Nova Página
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .canvas-viewport {
        flex: 1;
        overflow: auto;
        background-color: #e2e8f0;
        background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
        background-size: 20px 20px;
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        height: calc(100vh - 56px);
      }

      .canvas-workspace {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 100%;
      }

      .add-page-container {
        padding: 16px 0 60px 0;
        display: flex;
        justify-content: center;
      }

      .add-page-btn {
        height: 40px;
        border-radius: 8px;
        font-weight: 600;
        background: #ffffff;
        border-style: dashed;
        border-width: 1.5px;
      }
    `,
  ],
})
export class DocumentCanvasComponent {
  readonly facade = inject(DocumentBuilderFacade);

  onCanvasClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('canvas-viewport')) {
      this.facade.selectField(null);
    }
  }
}
