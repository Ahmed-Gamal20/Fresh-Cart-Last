import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProducts } from '../../core/interfaces/iproducts';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy{

  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);

  getSpecificProduct!:Subscription;

  detailsProduct:IProducts|null=null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
      let idProduct=  p.get('id');

      // call api
      this.getSpecificProduct=this._ProductsService.getSpecificProducts(idProduct).subscribe({
  next:(res)=>{
    console.log(res.data);
    this.detailsProduct=res.data

  },
  error:(err)=>{
    console.log(err);

  }
})

      }
    })
  }
ngOnDestroy(): void {
  this.getSpecificProduct.unsubscribe();
}
}
