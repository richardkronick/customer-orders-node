export interface Product {
  productId: string;
  price: number;
  numInStock: number;
}

export interface OrderDetail {
  orderDetailId: string;
  orderId: string;
  products: Product[];
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerAddress {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Customer {
  customerId: string;
  firstName: string;
  lastName: string;
  age: number;
  address: CustomerAddress;
  phoneNumber: string;
  email: string;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  ReturnRequested = 'ReturnRequested',
  Returned = 'Returned',
}