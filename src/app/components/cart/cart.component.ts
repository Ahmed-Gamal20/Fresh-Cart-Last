import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {


  private readonly _CartService=inject(CartService);
  constructor(private toastr: ToastrService) {}

 cartDetails:ICart={} as ICart;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

   this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log(res.data);
this.cartDetails=res.data;
localStorage.setItem('count',this.cartDetails.products.length.toString())
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  removeItem(id:string):void{
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails=res.data;
        this._CartService.cartNumber.next(res.numOfCartItems);

        this.toastr.warning("item deleted success","delete item from cart")

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  updateCount(id:string,count:number):void{
    this._CartService.updateProductQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data;
        this._CartService.cartNumber.next(res.numOfCartItems);


      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  clear():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message=='success'){
          this.cartDetails={} as ICart;
      this._CartService.cartNumber.next(0);
this.toastr.show("remove cart success","delete all item")
        }

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}
