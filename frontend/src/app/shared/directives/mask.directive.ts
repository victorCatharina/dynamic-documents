import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appMask]',
  standalone: true,
})
export class MaskDirective {
  readonly appMask = input<string>('');

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;
    const mask = this.appMask();
    if (!mask) return;

    let value = input.value;
    input.value = this.applyMask(value, mask);
  }

  private applyMask(value: string, maskType: string): string {
    if (!value) return '';
    const clean = value.replace(/\D/g, '');

    switch (maskType.toUpperCase()) {
      case 'CPF':
        // 000.000.000-00
        return clean
          .slice(0, 11)
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      case 'CNPJ':
        // 00.000.000/0000-00
        return clean
          .slice(0, 14)
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2');

      case 'PHONE':
      case 'TELEFONE':
        // (00) 00000-0000
        if (clean.length > 10) {
          return clean
            .slice(0, 11)
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d{4})$/, '$1-$2');
        }
        return clean
          .slice(0, 10)
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d{4})$/, '$1-$2');

      case 'CEP':
        // 00000-000
        return clean.slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2');

      case 'DATE':
      case 'DATA':
        // 00/00/0000
        return clean
          .slice(0, 8)
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\d{2})(\d)/, '$1/$2');

      default:
        return value;
    }
  }
}
