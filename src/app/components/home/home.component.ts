import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

private readonly  _ProductsService=inject(ProductsService);
private readonly  _CategoriesService=inject(CategoriesService);
private readonly _CartService=inject(CartService);
constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) {}
searchText:string="";

productList:IProducts[]=[];
categoriesList:ICategories[]=[];
getAllProductSub!:Subscription;

customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['prev', 'next'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    // 400: {
    //   items: 2
    // },
    // 740: {
    //   items: 3
    // },
    // 940: {
    //   items: 6
    // }
  },
  nav: true
}


ngOnInit(): void {
  // this.spinner.show()
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
console.log(res);
this.categoriesList=res.data;

    },
    error:(err)=>{
console.log(err);

    }
  })



  this.getAllProductSub=this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
console.log(res.data);
this.productList=res.data;
// this.spinner.hide()

    },
    error:(err)=>{
console.log(err);

    }
  })


}
addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.toastr.success(res.message,"added success")
      this._CartService.cartNumber.next(res.numOfCartItems);

    },
    error:(err)=>{
      console.log(err);

    }
  })
}



ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.getAllProductSub?.unsubscribe()
}
}
