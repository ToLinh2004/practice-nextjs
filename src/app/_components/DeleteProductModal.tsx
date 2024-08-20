'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Product } from '@/app/types';
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { deleteProduct } from '@/app/services/config';
import Image from 'next/image';
import { useLanguage } from '@/app/context/ChangeLanguageContext';

interface IProps {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
  product: Product;
}
export default function DeleteProductModal({ showModalDelete, setShowModalDelete, product }: IProps) {
const { language } = useLanguage();

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(product.id);
      if (res) {
        toast.success('Deleted product successfully');
        setShowModalDelete(false);
        mutate('https://6520d291906e276284c4b0d2.mockapi.io/api/1/products');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleCancel = () => {
    setShowModalDelete(false);
  };
  return (
    <>
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)} backdrop="static" keyboard={false} dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-xl font-bold text-blue-600">{language === 'en' ? 'Delete Product' : 'Xóa sản phẩm'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <Form.Group className="mb-2" controlId="productName">
                  <Form.Label className="text-md font-normal">{language === 'en' ? 'Product Name' : 'Tên sản phẩm'}</Form.Label>
                  <Form.Control type="text" placeholder="Enter product name" value={product.name} className="mt-1 rounded-md border p-2" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="productDescription">
                  <Form.Label className="text-md font-normal">{language === 'en' ? 'Description' : 'Mô tả'}</Form.Label>
                  <Form.Control type="text" placeholder="Enter description" value={product.description} className="mt-1 rounded-md border p-2" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="productPrice">
                  <Form.Label className="text-md font-normal">{language === 'en' ? 'Price' : 'Giá'}</Form.Label>
                  <Form.Control type="number" placeholder="Enter price" min="0" value={product.price} className="mt-1 rounded-md border p-2" />
                </Form.Group>
              </div>

              <div className="w-1/2">
                <Form.Group className="mb-1" controlId="productCategory">
                  <Form.Label className="text-md font-normal">{language === 'en' ? 'Category' : 'Danh mục'}</Form.Label>
                  <Form.Control type="text" placeholder="Enter product name" value={product.categoryName} className="mt-1 rounded-md border p-2" />
                </Form.Group>

                <Form.Group className="" controlId="productImage">
                  <Form.Label className="text-md font-normal">{language === 'en' ? 'Image' : 'Ảnh'}</Form.Label>

                  <div>
                    <Image src={product.img} width={200} height={80} alt="Product Image" className="h-40 w-72 rounded object-cover" />
                  </div>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-2" controlId="productSize">
              <div className="mt-2">
                <span>{language === 'en' ? 'Size' : 'Kích thước'}</span>
                <div className="mt-2 grid grid-cols-4 gap-6 sm:grid-cols-1 sm:gap-4">
                  {product.size.map((s, index) => (
                    <div key={index} className="mb-2 flex items-center space-x-2">
                      <input type="text" value={s.size} placeholder="Size" className="w-16 rounded-sm border p-1 focus:outline-none" />
                      <input
                        type="number"
                        min="0"
                        value={s.quantity}
                        placeholder="Quantity"
                        className="w-16 rounded-sm border p-1 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            {language === 'en' ? 'Cancel' : 'Hủy'}
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            {language === 'en' ? 'Delete' : 'Xóa'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
