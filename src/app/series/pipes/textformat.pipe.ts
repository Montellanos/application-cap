import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textformat'
})
export class TextformatPipe implements PipeTransform {

  private available_parameters = ['capitalize', 'allfirstupper', 'allupper', 'alllower'];

  transform(text: string, parameter: string): string {
    if (text !== null) {
      text = text.trim();
      if (parameter === null || parameter === undefined) {
        return this.capitalize(text);
      } else {
        parameter = parameter.toLowerCase().trim();
        if (this.validate(parameter)) {
          if (parameter === 'capitalize') {
            return this.capitalize(text);
          } else {
            if (parameter === 'allfirstupper') {
              return this.allFirstUpper(text);
            } else {
              if (parameter === 'allupper') {
                return this.allUpper(text);
              } else {
                if (parameter === 'alllower') {
                  return this.allLower(text);
                } else {
                  return this.capitalize(text);
                }
              }
            }
          }
        }
      }
    }
  }

  private capitalize(text: string): string {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
  }

  private validate(parameter): boolean {
    let control = false;
    this.available_parameters.forEach(param => {
      if (param === parameter) {
        control = true;
      }
    });
    return control;
  }


  private allFirstUpper(text: string): string {
    let final_text = '';
    const aux = text.split(' ');
    aux.forEach(part => {
      final_text += part.substring(0, 1).toUpperCase() + part.substring(1).toLowerCase() + ' ';
    });
    return final_text.trim();
  }

  private allUpper(text: string): string {
    return text.toUpperCase();
  }

  private allLower(text: string): string {
    return text.toLowerCase();
  }


}
