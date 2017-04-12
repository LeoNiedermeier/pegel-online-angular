import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCapital'
})
export class FirstLetterCapitalPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    // formats the given string so that the first letter and the first letter
    // after space and '-' are upper case. All other lower case.

    const chars = Array.from(value);
    // first is always upper case
    chars[0] = chars[0].toUpperCase();
    for (let i = 1; i < chars.length; i++) {
      if (chars[i - 1] === ' ' || chars[i - 1] === '-') {
        chars[i] = chars[i].toUpperCase();
      } else {
        chars[i] = chars[i].toLowerCase();
      }
    }
    // Note: no separator -> default is ','
    return chars.join('');
  }
}
