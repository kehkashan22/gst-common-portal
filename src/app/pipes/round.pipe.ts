import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform (input: number) {
    if (input < Math.floor(input) + 0.5) {
      return Math.floor(input);
    } else {
      return (Math.floor(input)) + 0.5;
    }

  }

}
