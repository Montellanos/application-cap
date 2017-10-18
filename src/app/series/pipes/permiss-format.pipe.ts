import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissFormat'
})
export class PermissFormatPipe implements PipeTransform {

  transform(permiss: boolean, args: any): string {
    if (permiss !== null) {
      if (permiss) {
        return 'Si';
      } else {
        return 'No';
      }
    }
  }

}
