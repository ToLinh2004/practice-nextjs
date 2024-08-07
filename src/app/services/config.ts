import { Product, Contact, Size, CartItem } from '@/app/types';
const productURL = `https://6520d291906e276284c4b0d2.mockapi.io/api/1`;
const contactURL = `https://65200b03906e276284c3f31a.mockapi.io`;

const getProductById = async (id: number) => {
  const response = await fetch(`${productURL}/products/${id}`);
  if (!response.ok) {
    throw new Error('failed to fetch products');
  }
  return await response.json();
};

const deleteProduct = async (id: number) => {
  const response = await fetch(`${productURL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('failed to fetch products');
  }
  return await response.json();
};

const deleteCartById = async (id: number) => {
  const response = await fetch(`${contactURL}/carts/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('failed to fetch products');
  }
  return await response.json();
};

const getAllProduct = async () => {
  const response = await fetch(`${productURL}/products`);
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const getCart = async () => {
  const response = await fetch(`${contactURL}/carts`);
  if (!response.ok) {
    throw new Error('failed to fetch carts');
  }

  return await response.json();
};

const addToCart = async (userId: number, productId: number, quantity: number, size: string, price: number) => {
  const response = await fetch(`${contactURL}/carts/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      productId,
      quantity,
      size,
      price,
    }),
  });
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const createProduct = async (
  name: string,
  img: string,
  price: number,
  description: string,
  size: Size[],
  status: string,
  categoryName: string,
  discount: boolean,
) => {
  const response = await fetch(`${productURL}/products/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      img,
      price,
      description,
      size,
      status,
      categoryName,
      discount,
    }),
  });
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const updateProduct = async (id: number, dataUpload: Product) => {
  const response = await fetch(`${productURL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUpload),
  });
  if (!response.ok) {
    throw new Error('failed to fetch products');
  }

  return await response.json();
};

const updateContact = async (id: number, changeStatus: Contact) => {
  const response = await fetch(`${contactURL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changeStatus),
  });
  if (!response.ok) {
    throw new Error('failed to fetch contacts');
  }

  return await response.json();
};

const updateCartItem = async (id: number, dataUpdate: CartItem) => {
  const response = await fetch(`${contactURL}/carts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUpdate),
  });
  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
};
const createContact = async (fullName: string, phone: string, email: string, message: string, status: string) => {
  const response = await fetch(`${contactURL}/contacts/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName,
      phone,
      email,
      message,
      status,
    }),
  });
  if (!response.ok) {
    throw new Error('failed to fetch contact');
  }

  return await response.json();
};

const updateUser = async (id: number, dataUser: Object) => {
  const response = await fetch(`${productURL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  });
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const getAllUser = async () => {
  const response = await fetch(`${productURL}/users`);
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

export {
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  updateContact,
  createContact,
  updateUser,
  getAllUser,
  addToCart,
  getCart,
  deleteCartById,
  updateCartItem,
};
