'use client';
import { Suspense } from 'react';
import { deleteCartById, getAllProduct, getCart, getProductById, updateCartItem } from '@/app/services/config';
import { useEffect, useState } from 'react';
import { useLoginContext } from '@/app/context/UserContext';
import { Product, CartItem, InputEvent, OrderItem, Order, Errors, MouseEvent } from '@/app/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import TitilePage from '@/app/_components/Titile';
import { useLanguage } from '@/app/context/ChangeLanguageContext';
import LoadingPage from '@/app/_components/Loading';
import Footer from '@/app/_components/Footer';
export default function CartPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const { user } = useLoginContext();
  const { setCartCount } = useCart();
  const { language } = useLanguage();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const getAllCart = async () => {
      try {
        const data = await getCart();
        const cartUserItems = data.filter((cart: CartItem) => cart.userId === user.id);
        if (cartUserItems) {
          setCarts(cartUserItems);
          setCartCount(cartUserItems.length);
          const productData = await getAllProduct();
          setProducts(productData);
          setLoading(false);
        } else {
          console.error('Fetch cart failed');
        }
      } catch (error) {
        console.error('Fetching cart failed:', error);
      }
    };

    getAllCart();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = carts.reduce((acc, cartItem) => {
        if (selectedItems.has(cartItem.id)) {
          const product = products.find((p) => p.id === cartItem.productId);
          if (product) {
            const itemTotal = product.discount ? product.price * cartItem.quantity * 0.9 : product.price * cartItem.quantity;
            return acc + itemTotal;
          }
        }
        return acc;
      }, 0);
      setTotal(total);
    };

    if (carts.length > 0 && products.length > 0) {
      calculateTotal();
    }
  }, [carts, products, selectedItems]);

  const handleDeleteCartItem = async (id: number) => {
    try {
      const res = await deleteCartById(id);
      if (res) {
        setCarts(carts.filter((cart) => cart.id !== id));
        setSelectedItems((prevSelected) => {
          const newSelected = new Set(prevSelected);
          newSelected.delete(id);
          return newSelected;
        });
        toast.success('Deleted product successfully');
      }
    } catch (error) {
      console.error('Delete cart failed:', error);
    }
  };

  const handleQuantityChange = async (cartItem: CartItem, increment: boolean) => {
    const updatedQuantity = increment ? cartItem.quantity + 1 : cartItem.quantity - 1;

    if (updatedQuantity <= 0) return;

    try {
      const product = await getProductById(cartItem.productId);

      const sizeObject = product.size.find((s: { size: string; quantity: number }) => s.size === cartItem.size);

      const availableQuantity = sizeObject ? sizeObject.quantity : 0;

      if (increment && updatedQuantity > availableQuantity) {
        toast.error('Exceeds available quantity');
        return;
      }

      const updatedCartItem = { ...cartItem, quantity: updatedQuantity };
      await updateCartItem(updatedCartItem.id, updatedCartItem);
      setCarts(carts.map((item) => (item.id === cartItem.id ? updatedCartItem : item)));
      toast.success('Updated quantity successfully');
    } catch (error) {
      console.error('Updating quantity failed:', error);
    }
  };

  function generateFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const handleCheckout = async (e: MouseEvent) => {
    e.preventDefault();
    const errors: Errors = {};
    if (!address) {
      errors.address = 'Address is required';
    }
    if (!phone) {
      errors.phone = 'Phone is required';
    } else if (!phone.match(/^[0-9]{10}$/)) {
      errors.phone = 'Enter valid phone ';
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Type address');
      return;
    }
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total.toString(),
          ipAddr: '13.160.92.202',
          txnRef: generateFiveDigitNumber(),
          orderInfo: total,
          returnUrl: 'http://localhost:3000/products/order',
        }),
      });
      const result = await response.json();
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Payment failed');
    }
  };

  useEffect(() => {
    const orderItems: OrderItem[] = carts
      .filter((cartItem) => selectedItems.has(cartItem.id))
      .map((cartItem) => ({
        cartId: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        size: cartItem.size,
        price: cartItem.price,
      }));
    if (typeof window !== undefined) {
      localStorage.setItem('orderItems', JSON.stringify(orderItems));
      const storedOrderItems = localStorage.getItem('orderItems');
      if (storedOrderItems) {
        const parsedOrderItems: OrderItem[] = JSON.parse(storedOrderItems);
        setOrders(parsedOrderItems);
      }
    }
  }, [carts, selectedItems]);

  const newOrder: Order = {
    userId: user.id,
    order: orders,
    total: total,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    address: address,
    phone: phone,
  };
  if (typeof window !== undefined) {
    localStorage.setItem('newOrders', JSON.stringify(newOrder));
  }

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };
  if (loading) return <LoadingPage />;
  return (
    <>
      <TitilePage name={language === 'en' ? 'Show Cart' : 'Giỏ Hàng'} />
      <Suspense fallback={<LoadingPage />}>
        {carts.length === 0 ? (
          <div className="mx-20 mt-72 rounded-lg bg-gray-100 p-4 shadow-lg">
            <span className="flex justify-center text-center">{language === 'en' ? 'No items in the cart' : 'Giỏ hàng trống'}</span>
            <Link href="/home" className="flex items-center justify-center text-lg text-blue-600 underline">
              {language === 'en' ? 'Go Back' : 'Trở lại'}
            </Link>
          </div>
        ) : (
          <div className="mx-20 my-10 rounded-lg bg-gray-100 p-4 shadow-lg">
            <div className="my-20 flex">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th colSpan={3} className="border-b px-4 py-2 uppercase text-gray-700 hover:text-blue-600">
                      {language === 'en' ? 'Product' : 'Sản phẩm'}
                    </th>
                    <th className="border-b px-4 py-2 uppercase hover:text-blue-600">{language === 'en' ? 'Price' : 'Giá'}</th>
                    <th className="border-b px-4 py-2 uppercase hover:text-blue-600">{language === 'en' ? 'Quantity' : 'Số Lượng'}</th>
                    <th className="border-b px-2 py-2 uppercase hover:text-blue-600">{language === 'en' ? 'Action' : 'Thao Tác'}</th>

                    <th className="border-b px-4 py-2 text-right uppercase hover:text-blue-600">{language === 'en' ? 'Total' : 'Tổng'}</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cartItem) => {
                    const product = products.find((p) => p.id === cartItem.productId);
                    return product ? (
                      <tr key={cartItem.productId} className="border-b">
                        <td className="flex items-center space-x-4 px-4 py-2">
                          <input type="checkbox" checked={selectedItems.has(cartItem.id)} onChange={() => handleCheckboxChange(cartItem.id)} />
                          {/* <button type="button" onClick={() => handleDeleteCartItem(cartItem.id)}>
                            <FontAwesomeIcon icon={faTimes} className="text-red-600" />
                          </button> */}
                          <Image src={product.img} alt={product.name} width={90} height={60} className="rounded object-cover" />
                        </td>
                        <td className="px-4 py-2">
                          <span className="font-semibold hover:text-blue-600">{product.name}</span>
                          <div className="text-sm text-gray-500">{`SIZE: ${product.size.find((size) => size.size === cartItem.size)?.size}`}</div>
                        </td>
                        <td className="px-4 py-2"></td>
                        <td className="px-4 py-2 text-left">
                          {product.discount ? (
                            <div className="flex items-center space-x-2">
                              <span>${(product.price * 0.9).toFixed(2)}</span>
                              <span className="text-red-600 line-through">${product.price}</span>
                            </div>
                          ) : (
                            <span>${product.price}</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex rounded-sm">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(cartItem, false)}
                              className="h-10 w-10 border border-gray-300 bg-gray-100 text-gray-800"
                            >
                              -
                            </button>
                            <span className="flex h-10 w-12 items-center justify-center border text-gray-800">{cartItem.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(cartItem, true)}
                              className="h-10 w-10 border border-gray-300 bg-gray-100 text-gray-800"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-center">
                          <button onClick={() => handleDeleteCartItem(cartItem.id)}>
                            <FontAwesomeIcon icon={faTimes} className="text-red-600" />
                          </button>
                        </td>

                        <td className="px-4 py-2 text-right">
                          ${product.discount ? (product.price * cartItem.quantity * 0.9).toFixed(2) : (product.price * cartItem.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>

              <div className="ml-10 w-1/3">
                <span className="font-bold uppercase hover:text-blue-600">{language === 'en' ? 'Total Amount' : 'Tổng số tiền'}</span>
                <hr />

                <div className="my-4 grid grid-cols-2 gap-4">
                  <span className="">{language === 'en' ? 'Subtotal' : 'Tạm tính'}</span>
                  <span className="text-right">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <hr />
                <div className="mb-2 grid grid-cols-3 gap-2">
                  <span className="mt-4">{language === 'en' ? 'Delivery' : 'Giao hàng'}</span>
                  <div className="col-span-2 text-right">
                    {language === 'en' ? 'VietNam' : 'Việt Nam'}
                    <br />
                    {language === 'en' ? 'Free Ship' : 'Miễn phí giao hàng'}
                    <br />
                    <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="text-blue-600">
                      {language === 'en' ? 'Address' : 'Địa chỉ'}
                    </button>
                    {isDropdownOpen && (
                      <div className="mt-2 bg-gray-200 px-2 shadow-sm">
                        <input
                          type="text"
                          placeholder={language === 'en' ? 'Enter Address' : 'Nhập địa chỉ'}
                          value={address}
                          onChange={(e: InputEvent) => setAddress(e.target.value)}
                          className="my-1 h-8 w-full border text-sm focus:outline-none"
                        />
                        {errors.address && <p className="text-left text-sm text-red-600">{errors.address}</p>}
                        <input
                          type="text"
                          placeholder={language === 'en' ? 'Enter Phone' : 'Nhập số điện thoại'}
                          value={phone}
                          className="my-1 h-8 w-full border text-sm focus:outline-none"
                          onChange={(e: InputEvent) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className="text-left text-sm text-red-600">{errors.phone}</p>}

                        {/* <button type="button" className="my-1 h-8 w-full rounded-sm border bg-blue-600 text-sm uppercase text-white">
                          {language === 'en' ? 'Address Update' : 'Cập nhập địa chỉ'}
                        </button> */}
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <span>{language === 'en' ? 'Total' : 'Tổng'}</span>
                  <span className="text-right">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <button className="text-md mt-4 h-10 w-full rounded-sm bg-blue-600 uppercase text-white" onClick={handleCheckout}>
                  {language === 'en' ? 'Check out' : 'Thanh Toán'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Suspense>
      <Footer />
    </>
  );
}
