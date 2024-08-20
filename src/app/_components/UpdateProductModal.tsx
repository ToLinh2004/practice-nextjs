'use client';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { mutate } from 'swr';
import { Errors, Product, Size } from '@/app/types';
import { toast } from 'react-toastify';
import { updateProduct } from '@/app/services/config';
import Image from 'next/image';
import Compressor from 'compressorjs';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  product: Product;
}

export default function UpdateProductModal({ showModalUpdate, setShowModalUpdate, product }: IProps) {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [img, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [categoryName, setCategoryName] = useState<string>('');
  const [status, setStatus] = useState<string>('active');
  const [sizes, setSizes] = useState<Size[]>([]);
  const [discount, setDiscount] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [file, setImageFile] = useState<File | undefined>(undefined);
const { language } = useLanguage();

  useEffect(() => {
    if (product && product.id) {
      setId(product.id);
      setName(product.name);
      setImage(product.img);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryName(product.categoryName || '');
      setStatus(product.status || 'active');
      setSizes(product.size || []);
      setDiscount(product.discount || false);
    }
  }, [product]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSizes = [...sizes];
    const quantity = parseInt(e.target.value, 10);


    if (!isNaN(quantity) && quantity >= 0) {
      newSizes[index].quantity = quantity;
    } else {
      newSizes[index].quantity = 0;
    }

    setSizes(newSizes);
  };


  const handleUpdateSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors: Errors = {};

    if (!name) errors.name = 'Product name is required';
    if (!img) errors.img = 'Image is required';
    if (!description) errors.description = 'Description is required';
    if (!price) errors.price = 'Price is required';
    else if (price < 0) errors.price = 'Price must be greater than 0';

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'image/gif'];
      const maxSize = 100000; // 100 KB

      if (!allowedTypes.includes(file.type)) errors.file = 'Unsupported file type. Allowed types: PNG, JPG, SVG, WEBP, GIF';
      if (file.size > maxSize) errors.file = 'File size too large. Maximum size is 100 KB';
    }

    const uniqueSizes = new Set();
    sizes.forEach((s) => {
      if (uniqueSizes.has(s.size)) {
        errors.size = 'Size already exists';
      } else {
        uniqueSizes.add(s.size);
      }
    });

    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const dataUpload: Product = {
      id,
      name,
      img,
      price,
      description,
      categoryName,
      status,
      size: sizes,
      discount,
    };

    try {
      const res = await updateProduct(id, dataUpload);
      if (res) {
        toast.success('Product updated successfully');
        setShowModalUpdate(false);
        mutate('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6, // Điều chỉnh chất lượng theo nhu cầu
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result as string);
            setImageFile(result as File);
          };
          reader.readAsDataURL(result as File);
        },
        error(err) {
          console.error('Compression error:', err);
        },
      });
    }
  };

  const handleCancel = () => {
    setShowModalUpdate(false);
    setErrors({});
    if (product) {
      setId(product.id);
      setName(product.name);
      setImage(product.img);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryName(product.categoryName || '');
      setStatus(product.status || 'active');
      setSizes(product.size || []);
      setDiscount(product.discount || false);
    }
  };

  return (
    <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)} backdrop="static" keyboard={false} dialogClassName="modal-lg">
      <Modal.Header>
        <Modal.Title className="text-xl font-bold text-blue-600">{language === 'en' ? 'Update Product' : 'Cập nhập sản phẩm'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Form.Group className="mb-2" controlId="productName">
                <Form.Label className="text-md font-normal">{language === 'en' ? 'Product Name' : 'Tên sản phẩm'}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={language === 'en' ? 'Enter product name' : 'Nhập tên sản phẩm'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 rounded-md border p-2"
                />
                {errors.name && <p className="mt-1 text-red-600">{errors.name}</p>}
              </Form.Group>

              <Form.Group className="mb-2" controlId="productDescription">
                <Form.Label className="text-md font-normal">{language === 'en' ? 'Description' : 'Mô tả'}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={language === 'en' ? 'Enter description' : 'Nhập mô tả'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 rounded-md border p-2"
                />
                {errors.description && <p className="mt-1 text-red-600">{errors.description}</p>}
              </Form.Group>

              <Form.Group className="mb-2" controlId="productPrice">
                <Form.Label className="text-md font-normal">{language === 'en' ? 'Price' : 'Giá'}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={language === 'en' ? 'Enter price' : 'Nhập giá'}
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-1 rounded-md border p-2"
                />
                {errors.price && <p className="mt-1 text-red-600">{errors.price}</p>}
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-md font-normal">{language === 'en' ? 'Discount' : 'Giảm giá'}</Form.Label>
                <div className="flex items-center space-x-4">
                  <Form.Check type="radio" id="discountYes" label="Yes" checked={discount} onChange={() => setDiscount(true)} />
                  <Form.Check type="radio" id="discountNo" label="No" checked={!discount} onChange={() => setDiscount(false)} />
                </div>
              </Form.Group>
            </div>

            <div className="w-1/2">
              <Form.Group className="mb-2" controlId="productImage">
                <Form.Label className="text-md font-normal">{language === 'en' ? 'Image' : 'Ảnh'}</Form.Label>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="uploadFile"
                    className="flex h-24 w-64 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mb-2 w-12 fill-gray-500" viewBox="0 0 32 32">
                      <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                      <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                    </svg>
                    {language === 'en' ? 'Upload file' : 'Tải ảnh lên'}
                    <input type="file" id="uploadFile" className="hidden" onChange={handleImageUpload} />
                    <p className="mt-2 text-xs font-medium text-gray-400">
                      {language === 'en' ? 'PNG, JPG, SVG, WEBP, and GIF are allowed.' : 'PNG, JPG, SVG, WEBP, và GIF được phép'}
                    </p>
                  </label>
                  {img && (
                    <div>
                      <Image src={img} width={80} height={80} alt="Product Image" className="h-20 w-20 rounded object-cover" />
                    </div>
                  )}
                </div>
                {errors.file && <p className="mt-1 text-red-600">{errors.file}</p>}
              </Form.Group>

              <Form.Group className="mb-2" controlId="productCategory">
                <Form.Label className="text-md font-normal">{language === 'en' ? 'Category' : 'Danh mục'}</Form.Label>
                <Form.Control
                  as="select"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 rounded-md border p-2"
                >
                  <option value="fashion">{language === 'en' ? 'Fashion Shoes' : 'Giày thời trang'}</option>
                  <option value="sport">{language === 'en' ? 'Sport Shoes' : 'Giày thể thao'}</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-2" controlId="productSize">
            <div className="mt-2">
              <span> {language === 'en' ? 'Add Size' : 'Thêm kích thước'}</span>
              <div className="mt-2 grid grid-cols-4 gap-6 sm:grid-cols-1 sm:gap-4">
                {sizes.map((s, index) => (
                  <div key={index} className="mb-2 flex items-center space-x-2">
                    <input
                      type="text"
                      value={s.size}
                      placeholder={language === 'en' ? 'Size' : 'Nhập kích thước'}
                      onChange={(e) => {
                        const newSizes = [...sizes];
                        newSizes[index] = { ...newSizes[index], size: e.target.value };
                        setSizes(newSizes);
                      }}
                      className="w-16 rounded-sm border p-1 focus:outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      value={s.quantity}
                      placeholder={language === 'en' ? 'Quantity' : 'Nhập số lượng'}
                      onChange={(e) => handleSizeChange(e, index)}
                      className="w-16 rounded-sm border p-1 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              {errors.size && <p className="mt-1 text-red-600">{errors.size}</p>}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          {language === 'en' ? 'Cancel' : 'Hủy'}
        </Button>
        <Button variant="primary" onClick={handleUpdateSubmit}>
          {language === 'en' ? 'Update' : 'Cập nhập'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
