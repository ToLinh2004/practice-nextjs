const baseUrl = `https://6520d291906e276284c4b0d2.mockapi.io/api/1`;

const apiGetDetailProduct = (id: number) => {
  return fetch(`${baseUrl}/${id}`);
};

const apiDeleteProduct = async (id: number) => {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};

const getProduct = async () => {
  const response = await fetch(`${baseUrl}/products`);
  if (!response.ok) {
    throw new Error('failed to fetch users');
  }

  return await response.json();
};
const apiUpdateProduct = (id: number, dataUpload: any) => {
  return fetch(`${baseUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUpload),
  });
};

export { apiDeleteProduct, apiGetDetailProduct, getProduct, apiUpdateProduct };
