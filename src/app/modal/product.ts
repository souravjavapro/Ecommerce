export interface  ApiResponseModel{
message:string,
result:boolean,
data:any
}


export interface Category {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number;
  userId: number | null;  // Assuming userId can be null
}

export interface ProductList {
    productId: number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    productDescription: string;
    createdDate: string;  // Use string or Date depending on how you want to manage the date
    deliveryTimeSpan: string;
    categoryId: number;
    productImageUrl: string;
    categoryName: string;
  }
  
  export class Customer{

      custId: number;
      name: string;
      MobileNo: string;
      Password: string;
    

      /**
       *
       */
      constructor() {
        this.custId=0;
        this.name='';
        this.MobileNo='';
        this.Password='';

        
      }
  }


   
  export class LoginModal{

  
    UserName: string;
    UserPassword: string;
  

    /**
     *
     */
    constructor() {
      this.UserName ='';
      this.UserPassword='';          
    }
   
}


  
export class CartModal{
  CartId:number
  CustId: number
  ProductId: number
  Quantity: number
  AddedDate: Date

  constructor() {
    this.CartId=0
    this.CustId =0;
    this.ProductId=0;
    this.Quantity=1;
    this.AddedDate=new Date();

    
  }
}
  export interface CartData {
    cartId: number;
    custId: number;
    productId: number;
    quantity: number;
    productShortName: string;
    addedDate: string;  // Use string or Date depending on your needs
    productName: string;
    categoryName: string;
    productImageUrl: string;
    productPrice: number;
  }
  
  export class OrderModel {
    saleId : number;
    custId : number;
    saleDate : Date;  // You can use string or Date depending on your logic
    totalInvoiceAmount : number;
    discount : number;
    paymentNaration : string;
    deliveryAddress1 : string;
    deliveryAddress2 : string;
    deliveryCity : string;
    deliveryPinCode : string;
    deliveryLandMark : string;
    isCanceled : boolean;
  
    constructor() {
      this.saleId=0;
      this.custId= 0;
      this.saleDate=new Date();  // You can use string or Date depending on your logic
      this.totalInvoiceAmount= 0;
      this.discount=0;
      this.paymentNaration= '';
      this.deliveryAddress1= '';
      this.deliveryAddress2= '';
      this.deliveryCity= '';
      this.deliveryPinCode='';
      this.deliveryLandMark= '';
      this.isCanceled=false;
    }
  }
  
  
