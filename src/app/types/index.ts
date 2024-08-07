export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
  size: Size[];
  status: string;
  categoryName: string;
  discount: boolean;
}
export interface Size {
  size: string;
  quantity: number;
}
export interface ProductProps {
  products: Product[];
  query: string;
  link: string;
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
  description?: string;
  phone?: string;
  message?: string;
  address?: string;
  file?: string;
  categoryName?: string;
  discount?: string;
  size?: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  avatar: string;
  role: string;
  status: string;
  address: string;
  date?: string;
  phone: string;
}

export interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export interface Search {
  query: string;
  link: string;
}

export interface Contact {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  status: string;
}

export interface LoginContextProps {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  user: User;
  setUser: (user: User) => void;
}
export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  size: string;
  price: number;
}

export interface SaleOffContextType {
  saleOffProducts: Product[];
  popularProducts: Product[];
}
export interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
