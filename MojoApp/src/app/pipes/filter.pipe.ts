import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(item: any[], searchText: string): any {
    let cadena:string='';
    return item.filter(i=>{
      cadena='';
      i.forEach(element => {
        cadena = cadena+element.toLowerCase();  
      });
      return cadena.includes(searchText.toLowerCase());
    });
    

  }

}
