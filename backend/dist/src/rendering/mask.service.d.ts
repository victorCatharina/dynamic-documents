export declare class MaskService {
    applyMask(value: any, maskOrType?: string): string;
    formatCpf(value: string): string;
    formatCnpj(value: string): string;
    formatCep(value: string): string;
    formatPhone(value: string): string;
    formatDate(value: any): string;
    formatNumber(value: any, decimalPlaces?: number): string;
    private applyPatternMask;
}
