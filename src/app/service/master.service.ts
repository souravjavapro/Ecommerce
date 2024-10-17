import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiResponseModel, CartModal, Customer, LoginModal, OrderModel } from '../modal/product';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
apiUrl:string ='https://freeapi.miniprojectideas.com/api/BigBasket/'
onCartadded:Subject<boolean>=new Subject<boolean>();
LoggedUseData:Customer=new Customer();
  constructor(private http:HttpClient) { 
    const isUser=localStorage.getItem(constants.LOCAl_KEY)
    if(isUser!=null)
    {

      const parsedata=JSON.parse(isUser);
      this.LoggedUseData=parsedata;
    }
    
  }

  getAllProducts(): Observable<ApiResponseModel>
  {
    return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllProducts")
  }

  getAllCategory(): Observable<ApiResponseModel>
  {
    return this.http.get<ApiResponseModel>(this.apiUrl+"GetAllCategory")
  }

  getAllProductByCategoryId(categoryId:number): Observable<ApiResponseModel>
  {
    const url=`${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<ApiResponseModel>(url);
  }

  RegisterNewCustomer(obj:Customer): Observable<ApiResponseModel>
  {
    const url=`${this.apiUrl}RegisterCustomer`;
    return this.http.post<ApiResponseModel>(url,obj);
  }

  LoginCustomer(obj:LoginModal): Observable<ApiResponseModel>
  {
    const url=`${this.apiUrl}Login`;
    return this.http.post<ApiResponseModel>(url,obj);
  }

   AddtoCart(obj:CartModal): Observable<ApiResponseModel>
  {
    const url=`${this.apiUrl}AddToCart`;
    return this.http.post<ApiResponseModel>(url,obj);
  }


  GetCartProductByCustomerId(LoggedUserId:number): Observable<ApiResponseModel>
  {
    debugger;
    const url=`${this.apiUrl}GetCartProductsByCustomerId?id=${LoggedUserId}`;
    return this.http.get<ApiResponseModel>(url);
  }
  DeleteProductById(cartid:number): Observable<ApiResponseModel>
  {
    debugger;
    const url=`${this.apiUrl}DeleteProductFromCartById?id=${cartid}`;
    return this.http.get<ApiResponseModel>(url);
  }
  OnPlaceOrder(obj:OrderModel): Observable<ApiResponseModel>
  {
    const url=`${this.apiUrl}PlaceOrder`;
    return this.http.post<ApiResponseModel>(url,obj);
  }

}
