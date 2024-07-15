export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  description:string;
}

export interface ProductProps {
  products: Product[];
  query: string;
}

export interface Errors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  price?: string;
  quantity?: string;
  img?: string;
}

export type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  status: string;
  address:string;
};

export interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}
