import { Pipe, PipeTransform } from '@angular/core';

// Pipe pour tronquer le texte
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, wordLimit: number): string {
    if (!value) return '';
    
    const words = value.split(' ');
    if (words.length <= wordLimit) {
      return value;
    }
    return words.slice(3, wordLimit).join(' ') + '...';
  }
}

// Pipe pour capitaliser les mots
@Pipe({
  name: 'capitalizeWords'
})
export class CapitalizeWordsPipe implements PipeTransform {
  
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\b\w/g, char => char.toUpperCase());
  }
}
