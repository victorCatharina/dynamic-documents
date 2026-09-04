import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { CoordinateService } from '../../../../core/services/coordinate.service';
import { DocumentTemplateField } from '../../../../core/models/template.model';

@Component({
  selector: 'app-document-field',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, MatTooltipModule],
  template: `
    <div
      class="canvas-field"
      [class.selected]="isSelected()"
      [class.read-only]="facade.isReadOnly()"
      [style.left.px]="fieldPx().x"
      [style.top.px]="fieldPx().y"
      [style.width.px]="fieldPx().width"
      [style.height.px]="fieldPx().height"
      [style.font-family]="field().style?.fontFamily || 'Helvetica'"
      [style.font-size.px]="getVisualFontSize()"
      [style.color]="field().style?.color || '#000000'"
      [style.font-weight]="field().style?.bold ? 'bold' : 'normal'"
      [style.font-style]="field().style?.italic ? 'italic' : 'normal'"
      [style.text-decoration]="field().style?.underline ? 'underline' : 'none'"
      [style.text-align]="(field().style?.alignment || 'LEFT').toLowerCase()"
      cdkDrag
      [cdkDragDisabled]="facade.isReadOnly() || isResizing"
      [cdkDragFreeDragPosition]="{ x: fieldPx().x, y: fieldPx().y }"
      (cdkDragEnded)="onDragEnded($event)"
      (click)="onClick($event)"
    >
      <!-- Field Visual Content -->
      <div class="field-inner" [style.align-items]="getVerticalAlignment()">
        <span class="field-text">
          {{ field().label || field().key }}
        </span>
        @if (field().inputMode === 'INTEGRATION') {
          <span class="integration-tag">API</span>
        }
      </div>

      <!-- Selection Box Controls (Only when selected) -->
      @if (isSelected() && !facade.isReadOnly()) {
        <div class="selection-overlay">
          <!-- Quick Toolbar -->
          <div class="field-quick-bar" (click)="$event.stopPropagation()">
            <span class="quick-key">{{ field().key }}</span>
            <button class="quick-btn" (click)="duplicate()" matTooltip="Duplicar (Ctrl+D)">
              <mat-icon>content_copy</mat-icon>
            </button>
            <button class="quick-btn delete" (click)="delete()" matTooltip="Excluir (Delete)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>

          <!-- Resize Handles -->
          <div
            class="resize-handle handle-e"
            (mousedown)="startResize($event, 'e')"
          ></div>
          <div
            class="resize-handle handle-s"
            (mousedown)="startResize($event, 's')"
          ></div>
          <div
            class="resize-handle handle-se"
            (mousedown)="startResize($event, 'se')"
          ></div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .canvas-field {
        position: absolute;
        border: 1px dashed #94a3b8;
        background: rgba(255, 255, 255, 0.85);
        cursor: move;
        user-select: none;
        display: flex;
        box-sizing: border-box;
        transition: border-color 0.1s ease, box-shadow 0.1s ease;

        &:hover {
          border-color: #3b82f6;
          background: rgba(239, 246, 255, 0.9);
        }

        &.selected {
          border: 1.5px solid #2563eb;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 20;
        }

        &.read-only {
          cursor: default;
          border-style: solid;
          border-color: #cbd5e1;
        }
      }

      .field-inner {
        width: 100%;
        height: 100%;
        padding: 4px 6px;
        display: flex;
        overflow: hidden;
        gap: 6px;
      }

      .field-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .integration-tag {
        font-size: 0.65rem;
        font-weight: 700;
        color: #7c3aed;
        background: #f5f3ff;
        border: 1px solid #ddd6fe;
        border-radius: 3px;
        padding: 0 4px;
        align-self: center;
        letter-spacing: 0.05em;
      }

      .selection-overlay {
        position: absolute;
        inset: -1px;
        pointer-events: none;
      }

      .field-quick-bar {
        position: absolute;
        top: -30px;
        left: 0;
        height: 24px;
        background: #0f172a;
        color: #ffffff;
        border-radius: 4px;
        padding: 0 6px;
        display: flex;
        align-items: center;
        gap: 4px;
        pointer-events: auto;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        z-index: 30;
      }

      .quick-key {
        font-size: 0.725rem;
        font-family: 'Roboto Mono', monospace;
        color: #94a3b8;
        padding-right: 4px;
        border-right: 1px solid #334155;
      }

      .quick-btn {
        background: transparent;
        border: none;
        color: #cbd5e1;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        border-radius: 3px;

        mat-icon {
          font-size: 14px;
          width: 14px;
          height: 14px;
        }

        &:hover {
          background: #334155;
          color: #ffffff;
        }

        &.delete:hover {
          background: #dc2626;
          color: #ffffff;
        }
      }

      /* Resize Handles */
      .resize-handle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #ffffff;
        border: 1.5px solid #2563eb;
        border-radius: 2px;
        pointer-events: auto;
        z-index: 25;

        &.handle-e {
          right: -4px;
          top: calc(50% - 4px);
          cursor: e-resize;
        }

        &.handle-s {
          bottom: -4px;
          left: calc(50% - 4px);
          cursor: s-resize;
        }

        &.handle-se {
          right: -4px;
          bottom: -4px;
          cursor: se-resize;
        }
      }
    `,
  ],
})
export class DocumentFieldComponent {
  readonly field = input.required<DocumentTemplateField>();
  readonly facade = inject(DocumentBuilderFacade);
  readonly coord = inject(CoordinateService);

  isResizing = false;
  private resizeDirection = '';
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;

  readonly isSelected = computed(() => this.facade.selectedFieldId() === this.field().id);

  readonly fieldPx = computed(() => {
    const zoom = this.facade.zoom();
    return this.coord.fieldPtToPx(this.field().position, zoom);
  });

  getVisualFontSize(): number {
    const pt = this.field().style?.fontSize || 12;
    return Math.max(8, Math.round(this.coord.ptToPx(pt, this.facade.zoom())));
  }

  getVerticalAlignment(): string {
    const align = this.field().style?.verticalAlignment || 'TOP';
    switch (align) {
      case 'CENTER':
        return 'center';
      case 'BOTTOM':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.facade.selectField(this.field().id);
  }

  onDragEnded(event: CdkDragEnd): void {
    const zoom = this.facade.zoom();
    const element = event.source.getRootElement();
    const transform = element.style.transform;

    // Extrai translação do estilo de drag do CDK
    const match = /translate3d\(([-\d.]+)px,\s*([-\d.]+)px/i.exec(transform);
    let newX = this.fieldPx().x;
    let newY = this.fieldPx().y;

    if (match) {
      newX += parseFloat(match[1]);
      newY += parseFloat(match[2]);
    }

    const posPt = {
      x: this.coord.pxToPt(newX, zoom),
      y: this.coord.pxToPt(newY, zoom),
    };

    this.facade.moveField(this.field().id, posPt);
    event.source.reset();
  }

  startResize(event: MouseEvent, direction: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.isResizing = true;
    this.resizeDirection = direction;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.fieldPx().width;
    this.startHeight = this.fieldPx().height;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) return;

    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    const zoom = this.facade.zoom();

    let newWidth = this.startWidth;
    let newHeight = this.startHeight;

    if (this.resizeDirection.includes('e')) {
      newWidth = Math.max(30, this.startWidth + deltaX);
    }
    if (this.resizeDirection.includes('s')) {
      newHeight = Math.max(15, this.startHeight + deltaY);
    }

    const sizePt = {
      width: this.coord.pxToPt(newWidth, zoom),
      height: this.coord.pxToPt(newHeight, zoom),
    };

    this.facade.resizeField(this.field().id, sizePt);
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
    }
  }

  duplicate(): void {
    this.facade.duplicateField(this.field().id);
  }

  delete(): void {
    this.facade.removeField(this.field().id);
  }
}
