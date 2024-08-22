'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { mutate } from 'swr';
import { Errors, Size } from '@/app/types';
import { toast } from 'react-toastify';
import { createProduct } from '@/app/services/config';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Compressor from 'compressorjs';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

export default function CreateProductModal({ showModalCreate, setShowModalCreate }: IProps) {
  const [name, setName] = useState<string>('');
  const [img, setImage] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const status = 'active';
  const [sizes, setSizes] = useState<Size[]>([]);
  const [discount, setDiscount] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [file, setImageFile] = useState<File | undefined>(undefined);
  const [newSize, setNewSize] = useState<string>('');
  const { language } = useLanguage();

  const isSizeDuplicate = (size: string) => {
    return sizes.some((s) => s.size === size);
  };

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

  const handleAddSize = () => {
    if (isSizeDuplicate(newSize)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        size: 'Size is required',
      }));
      return;
    }

    const newSizes = [...sizes, { size: newSize, quantity: 0 }];
    setSizes(newSizes);
    setNewSize('');
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleCreateSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errorMessages: Errors = {};

    if (!name) errorMessages.name = 'Product name is required';
    if (!description) errorMessages.description = 'Description is required';
    if (!img) errorMessages.img = 'Image is required';
    if (price <= 0) errorMessages.price = 'Enter a valid price greater than 0';

    const uniqueSizes = new Set();
    sizes.forEach((s) => {
      if (uniqueSizes.has(s.size)) {
        errorMessages.size = 'Size already exists';
      } else {
        uniqueSizes.add(s.size);
      }
    });

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'image/gif'];
      const maxSize = 1000000; // 1 MB

      if (file.size > maxSize) {
        errorMessages.file = 'File size too large. Maximum size is 1 MB.';
      } else if (!allowedTypes.includes(file.type)) {
        errorMessages.file = 'Please upload PNG, JPG, SVG, WEBP, or GIF images.';
      }
    }

    setErrors(errorMessages);

    if (Object.keys(errorMessages).length > 0) return;

    try {
      const res = await createProduct(name, img, price, description, sizes, status, categoryName, discount);
      if (res) {
        setShowModalCreate(false);
        toast.success('Product created successfully');
        setErrors({});
        setImage('');
        setSizes([]);
        setName('');
        setPrice(0);
        setDescription('');
        setCategoryName('');
        setDiscount(false);
        mutate('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products');
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
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

  const cancel = () => {
    setShowModalCreate(false);
    setErrors({});
    setImage('');
    setSizes([]);
    setName('');
    setPrice(0);
    setDescription('');
    setCategoryName('');
    setDiscount(false);
  };

  return (
    <Modal show={showModalCreate} onHide={cancel} backdrop="static" keyboard={false} dialogClassName="modal-lg">
      <Modal.Header>
        <Modal.Title className="text-2xl font-bold">{language === 'en' ? 'Create Product' : 'Thêm sản phẩm'}</Modal.Title>
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
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-1 rounded-md border p-2"
                />
                {errors.price && <p className="mt-1 text-red-600">{errors.price}</p>}
              </Form.Group>
              <Form.Group className="mb-2">
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
        </Form>
        <Form.Group className="mb-2" controlId="productSize">
          <div className="mt-2">
            <button
              type="button"
              className="mb-2 h-8 w-24 rounded-md bg-blue-600 text-white transition duration-200 hover:bg-black"
              onClick={handleAddSize}
            >
              {language === 'en' ? 'Add Size' : 'Kích thước'}
            </button>
            <div className="grid grid-cols-4 gap-6 sm:grid-cols-1 sm:gap-4">
              {sizes.map((size, index) => (
                <div key={index} className="mb-2 flex items-center space-x-2">
                  <input
                    type="text"
                    value={size.size}
                    placeholder={language === 'en' ? 'Size' : 'Nhập'}
                    onChange={(e) => {
                      const newSizes = [...sizes];
                      newSizes[index] = { ...newSizes[index], size: e.target.value };
                      setSizes(newSizes);
                    }}
                    className="w-16 rounded-sm border p-1"
                  />
                  <input
                    type="number"
                    value={size.quantity}
                    placeholder={language === 'en' ? 'Quantity' : 'Nhập số lượng'}
                    onChange={(e) => handleSizeChange(e, index)}
                    className="w-16 rounded-sm border p-1"
                  />

                  <button
                    type="button"
                    className="h-6 w-6 rounded-sm text-white transition duration-200 hover:bg-red-600"
                    onClick={() => handleRemoveSize(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 hover:text-white" />
                  </button>
                </div>
              ))}
            </div>
            {errors.size && <p className="mt-1 text-red-600">{errors.size}</p>}
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>
          {language === 'en' ? 'Cancel' : 'Hủy'}
        </Button>
        <Button variant="primary" onClick={handleCreateSubmit}>
          {language === 'en' ? 'Create' : 'Tạo'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
