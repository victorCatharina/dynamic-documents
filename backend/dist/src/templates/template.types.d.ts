export type PageSizeType = 'A4' | 'A5' | 'LETTER' | 'LEGAL';
export type PageOrientationType = 'PORTRAIT' | 'LANDSCAPE';
export type FieldTypeEnum = 'TEXT' | 'NUMBER' | 'DATE' | 'IMAGE' | 'FILE';
export type FieldInputModeEnum = 'MANUAL' | 'INTEGRATION';
export interface PageMargins {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}
export interface PageConfiguration {
    size: PageSizeType;
    orientation: PageOrientationType;
    margins?: PageMargins;
}
export interface FieldPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface FieldStyle {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    verticalAlignment?: 'TOP' | 'CENTER' | 'BOTTOM';
}
export interface FieldValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: string;
    min?: number;
    max?: number;
    decimalPlaces?: number;
    minDate?: string;
    maxDate?: string;
}
export interface DocumentTemplateField {
    id: string;
    key: string;
    label?: string;
    type: FieldTypeEnum;
    inputMode: FieldInputModeEnum;
    position: FieldPosition;
    style?: FieldStyle;
    validation?: FieldValidation;
    mask?: string;
}
export interface DocumentTemplatePage {
    number: number;
    background?: {
        assetId?: string;
        url?: string;
    };
    fields: DocumentTemplateField[];
}
export interface DocumentTemplate {
    page: PageConfiguration;
    pages: DocumentTemplatePage[];
}
export declare const PAGE_DIMENSIONS_PT: Record<PageSizeType, {
    width: number;
    height: number;
}>;
