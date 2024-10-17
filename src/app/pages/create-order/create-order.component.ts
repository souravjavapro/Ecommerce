import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, CartData, OrderModel } from '../../modal/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {
masterservice=inject(MasterService)
cartData:CartData [] =[];
totalAmount : number=0;
orderObj : OrderModel =new OrderModel();
ngOnInit(): void {
  this.GetCartItems();
}


GetCartItems()
{
  debugger;
  this.masterservice.GetCartProductByCustomerId(this.masterservice.LoggedUseData.custId).subscribe((res:ApiResponseModel)=>{
     this.cartData=res.data;
     this.cartData.forEach(element =>{
      this.totalAmount=this.totalAmount + element.productPrice;
     })
     
  })
}

PlaceOrder()
{
  this.orderObj.custId=this.masterservice.LoggedUseData.custId;
  this.orderObj.totalInvoiceAmount=this.totalAmount;
  this.masterservice.OnPlaceOrder(this.orderObj).subscribe((res:ApiResponseModel)=>
  {
   if(res.result)
   {
    alert("Order placed Successsfully");
    this.GetCartItems();
    this.orderObj=new OrderModel();
   }
   else{
    alert(res.message);
   }
  });

}
}
