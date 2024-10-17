import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiResponseModel, CartData, Customer, LoginModal } from './modal/product';
import { FormsModule } from '@angular/forms';
import { MasterService } from './service/master.service';
import { constants } from './constants/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EcommerceApp';
  registerObj : Customer=new Customer();
  loginObj : LoginModal=new LoginModal()
  LoggedUseData : Customer=new Customer();
  cartData: CartData[]=[];

     @ViewChild("registerModal") registerModal:ElementRef | undefined

     @ViewChild("loginModal") loginModal:ElementRef | undefined
isCartPopupOpen: Boolean=false;
  ngOnInit(): void {
    const isUser=localStorage.getItem(constants.LOCAl_KEY)
    if(isUser!=null)
    {

      const parsedata=JSON.parse(isUser);
      this.LoggedUseData=parsedata;
      this.GetCartItems();
    }
    this.masterservice.onCartadded.subscribe((res:any)=>{
      this.GetCartItems();
    })
  }
masterservice=inject(MasterService)
  
  openRegisterModal()
  {
    if(this.registerModal)
      {
        this.registerModal.nativeElement.style.display="block"
      }
    
  }
  closeRegisterModal()
  {
    if(this.registerModal)
      {
        this.registerModal.nativeElement.style.display="none"
      }
    
  }
  onRegister()
  {
this.masterservice.RegisterNewCustomer(this.registerObj).subscribe((res:ApiResponseModel)=>
{
  if(res.result)
  {
    alert("User Registered Successfully");
    this.closeRegisterModal();
  }
  else{
    alert(res.message);

  }
})
  }

  openLoginModal()
  {
    if(this.loginModal)
      {
        this.loginModal.nativeElement.style.display="block"
      }
    
  }
  closeLoginModal()
  {
    if(this.loginModal)
      {
        this.loginModal.nativeElement.style.display="none"
      }
    
  }

  onLogin()
{
     this.masterservice.LoginCustomer(this.loginObj).subscribe((res:ApiResponseModel)=>
{
  if(res.result)
  {
    this.LoggedUseData=res.data;
    localStorage.setItem(constants.LOCAl_KEY,JSON.stringify(res.data))
    alert("User Logged in  Successfully");
    this.closeLoginModal();
  }
  else{
    alert(res.message);
  }
})
  }

  Logout(){
    localStorage.removeItem(constants.LOCAl_KEY);
    this.LoggedUseData=new Customer();
  }

  ShowCartPopup()
  {
       this.isCartPopupOpen=!this.isCartPopupOpen
       this.GetCartItems();
  }


  GetCartItems()
  {
    debugger;
    this.masterservice.GetCartProductByCustomerId(this.LoggedUseData.custId).subscribe((res:ApiResponseModel)=>{
       this.cartData=res.data;
       
    })
  }

  deleteProduct(cartid:number)
  {
    debugger;
       this.masterservice.DeleteProductById(cartid).subscribe((res:ApiResponseModel)=>{

        if(res.result){
          alert("Product deleted  Successfully");
          this.GetCartItems();
        }
        else
        {
          alert(res.message);
        }
       })
  }
}
