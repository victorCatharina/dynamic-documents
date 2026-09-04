import { Injectable } from '@angular/core';
import {
  PageConfiguration,
  PageSizeType,
  PageOrientationType,
  PAGE_DIMENSIONS_PT,
  FieldPosition,
} from '../models/template.model';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  /**
   * Padrão de conversão: 1 pt = 1.3333 px a 96 DPI (72 pt por polegada)
   */
  readonly PT_TO_PX_RATIO = 96 / 72; // ~1.3333333333333333

  /**
   * Converte pontos (pt) para pixels (px) considerando zoom.
   */
  ptToPx(pt: number, zoom = 1): number {
    return pt * this.PT_TO_PX_RATIO * zoom;
  }

  /**
   * Converte pixels (px) para pontos (pt) removendo o fator de zoom.
   */
  pxToPt(px: number, zoom = 1): number {
    if (zoom <= 0) zoom = 1;
    return (px / zoom) / this.PT_TO_PX_RATIO;
  }

  /**
   * Retorna as dimensões em pontos (pt) de uma página considerando sua orientação.
   */
  getPageDimensionsPt(size: PageSizeType, orientation: PageOrientationType): { width: number; height: number } {
    const base = PAGE_DIMENSIONS_PT[size] || PAGE_DIMENSIONS_PT.A4;
    if (orientation === 'LANDSCAPE') {
      return { width: base.height, height: base.width };
    }
    return { width: base.width, height: base.height };
  }

  /**
   * Retorna as dimensões visuais em pixels (px) para renderização no Canvas.
   */
  getPageDimensionsPx(pageConfig: PageConfiguration, zoom = 1): { width: number; height: number } {
    const pt = this.getPageDimensionsPt(pageConfig.size, pageConfig.orientation);
    return {
      width: Math.round(this.ptToPx(pt.width, zoom)),
      height: Math.round(this.ptToPx(pt.height, zoom)),
    };
  }

  /**
   * Converte a posição visual de um campo em pixels para a posição persistida em pontos.
   */
  fieldPxToPt(positionPx: { x: number; y: number; width: number; height: number }, zoom = 1): FieldPosition {
    return {
      x: Math.max(0, Math.round(this.pxToPt(positionPx.x, zoom) * 100) / 100),
      y: Math.max(0, Math.round(this.pxToPt(positionPx.y, zoom) * 100) / 100),
      width: Math.max(10, Math.round(this.pxToPt(positionPx.width, zoom) * 100) / 100),
      height: Math.max(10, Math.round(this.pxToPt(positionPx.height, zoom) * 100) / 100),
    };
  }

  /**
   * Converte a posição persistida em pontos de um campo para a posição visual em pixels.
   */
  fieldPtToPx(positionPt: FieldPosition, zoom = 1): { x: number; y: number; width: number; height: number } {
    return {
      x: this.ptToPx(positionPt.x, zoom),
      y: this.ptToPx(positionPt.y, zoom),
      width: this.ptToPx(positionPt.width, zoom),
      height: this.ptToPx(positionPt.height, zoom),
    };
  }

  /**
   * Aplica alinhamento magnético (snap to grid) em pontos.
   */
  snapToGrid(val: number, gridSizePt = 5): number {
    return Math.round(val / gridSizePt) * gridSizePt;
  }
}
