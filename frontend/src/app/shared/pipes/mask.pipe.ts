import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appMask',
  standalone: true,
})
export class MaskPipe implements PipeTransform {
  transform(value: string | number | null | undefined, maskType?: string): string {
    if (!value) return '';
    const str = String(value);
    if (!maskType) return str;

    const clean = str.replace(/\D/g, '');

    switch (maskType.toUpperCase()) {
      case 'CPF':
        return clean
          .slice(0, 11)
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      case 'CNPJ':
        return clean
          .slice(0, 14)
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2');

      case 'PHONE':
      case 'TELEFONE':
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
        return clean.slice(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2');

      default:
        return str;
    }
  }
}
