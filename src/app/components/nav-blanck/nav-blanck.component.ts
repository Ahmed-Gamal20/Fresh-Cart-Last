import { Component, inject, numberAttribute, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { count } from 'console';

@Component({
  selector: 'app-nav-blanck',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blanck.component.html',
  styleUrl: './nav-blanck.component.scss'
})
export class NavBlanckComponent implements OnInit {

  readonly _AuthService=inject(AuthService)
  readonly _CartService=inject(CartService)
count:number=0;

ngOnInit(): void {

  this._CartService.getProductsCart().subscribe({
next:(res)=>{
  console.log(res);
  this._CartService.cartNumber.next(res.numOfCartItems)

}
  })
 this._CartService.cartNumber.subscribe({
  next:(data)=>{
    this.count=data;
  }
 });



}
}
