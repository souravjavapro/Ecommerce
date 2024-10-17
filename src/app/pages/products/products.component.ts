import { Component, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, CartModal, Category, Customer, ProductList } from '../../modal/product';
import {  map, Observable, Subscriber, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { constants } from '../../constants/constants';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  implements OnInit,OnDestroy {
  // productlist:ProductList []=[];
  productlist=signal<ProductList []>([]);
  categorylist$:Observable<Category []>=new Observable<Category[]>();
subscriptionlist:Subscription[]=[];
LoggedUseData:Customer=new Customer();
   masterservice= inject(MasterService)

   /**
    *
    */
   constructor() {
    this.LoggedUseData=this.masterservice.LoggedUseData;
    
   }
  ngOnInit(): void {
    this.loadAllProducts();
    this.categorylist$=this.masterservice.getAllCategory().pipe(
      map(item=> item.data)
    )
  }



  loadAllProducts()
  {
    debugger;
    this.subscriptionlist.push(this.masterservice.getAllProducts().subscribe((resp:ApiResponseModel)=>
    {
        this.productlist.set(resp.data);
    })) 
  }
  GetProductByCategory(id:number)
  {
this.masterservice.getAllProductByCategoryId(id).subscribe((resp:ApiResponseModel)=>
{
  this.productlist.set(resp.data);
})

  }

  AddToCart(id: number){
    debugger;
const newobj : CartModal= new CartModal();
  newobj.ProductId=id;
  newobj.CustId=this.masterservice.LoggedUseData.custId;


    this.masterservice.AddtoCart(newobj).subscribe((res:ApiResponseModel)=>{
      if(res.result)
      {
        alert("Product Added to cart successfully");
        this.masterservice.onCartadded.next(true)
      }
      else{
        alert(res.message);
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptionlist.forEach(element=>{

      element.unsubscribe();
    })
  }
}
