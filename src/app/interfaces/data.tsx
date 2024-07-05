export interface Product {
    id: number;
    name: string;
    img: string;
    price: number;
    quantity: number;
}

export interface IProps {
    products: Product[];
  }


  export interface Errors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }