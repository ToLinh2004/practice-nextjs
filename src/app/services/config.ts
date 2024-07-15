const baseUrl = `https://6520d291906e276284c4b0d2.mockapi.io/api/1`;

const getProductById = async (id: number) => {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error('failed to fetch products');
  }
  return await response.json();
};

const deleteProduct = async (id: number) => {
  const response = await fetch(`${baseUrl}/products/${id}`, {
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
  const response = await fetch(`${baseUrl}/products`);
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const createProduct = async (
  name: string,
  img: string,
  price: number,
  quantity: number,
) => {
  const response = await fetch(`${baseUrl}/products/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      img,
      price,
      quantity,
    }),
  });
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const updateProduct = async (id: number, dataUpload: any) => {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUpload),
  });
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
};
