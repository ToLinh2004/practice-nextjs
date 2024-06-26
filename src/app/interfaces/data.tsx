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