import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfProduct:any[], textSearch:string): any {
    return arrayOfProduct.filter((item)=>item.title.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())) ;
  }

}
