import { Injectable } from '@nestjs/common';

@Injectable()
export class DataResolverService {
  /**
   * Safe data resolver without any eval or code execution.
   * Maps field.key to data[field.key] with support for nested property paths.
   */
  resolveValue(data: Record<string, any> | undefined | null, key: string): any {
    if (!data || !key) {
      return undefined;
    }

    // Direct key lookup
    if (key in data) {
      return data[key];
    }

    // Safe nested dot-notation navigation (e.g. "cliente.endereco.cidade")
    if (key.includes('.')) {
      const parts = key.split('.');
      let current: any = data;
      for (const part of parts) {
        if (current === null || current === undefined || typeof current !== 'object') {
          return undefined;
        }
        current = current[part];
      }
      return current;
    }

    return undefined;
  }
}
