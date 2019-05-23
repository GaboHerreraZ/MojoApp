import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(item: any[], text:string ): any {
    
    return item.filter((i:any)=>{
      return i.nombres.toLowerCase().includes(text.toLowerCase());
    })
  }

}
