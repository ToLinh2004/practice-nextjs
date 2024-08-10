'use client';
import Image from 'next/image';
import FamousBrand from '@/app/_components/FamousBrand';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductPropose from '@/app/_components/ProductPropose';
import { Product, Size, CartItem } from '@/app/types';
import { addToCart, getAllProduct, getProductById, getCart, updateCartItem } from '@/app/services/config';
import { useLoginContext } from '@/app/context/UserContext';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CreateModalLogin from '@/app/_components/CreateModalLogin';
import TitilePage from '@/app/_components/Titile';
export default function DetailProductPage({ params }: { params: { id: number } }) {
  const { user } = useLoginContext();
  const [carts, setCarts] = useState<CartItem[]>([]);
  const router = useRouter();
  const [showCreateModalLogin, setShowCreateModalLogin] = useState<boolean>(false);

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    img: '',
    price: 0,
    description: '',
    size: [],
    status: '',
    categoryName: '',
    discount: false,
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        const data = await getProductById(params.id);
        if (data) {
          setProduct(data);
          setSelectedSize(data.size[0]);
          fetchRelatedProducts(data.categoryName);
        } else {
          console.error('Fetch product detail that failed');
        }
      } catch (error) {
        console.error('Fetching product detail failed:', error);
      }
    };
    getDetailProduct();
  }, [params.id]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedSize]);

  const fetchRelatedProducts = async (category: string) => {
    try {
      const data = await getAllProduct();
      const related = data.filter((product: Product) => product.categoryName === category && product.status === 'active');
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleTurnBack = () => {
    router.back();
  };

  const calculateDiscountedPrice = (price: number): number => {
    return Math.round(price * 0.8);
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity((prevQuantity) => {
      if (type === 'increment' && selectedSize && prevQuantity < selectedSize.quantity) {
        return prevQuantity + 1;
      } else if (type === 'decrement' && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  useEffect(() => {
    const getAllCart = async () => {
      try {
        const data = await getCart();
        const cartUserItems = data.filter((cart: CartItem) => cart.userId === user.id);
        if (cartUserItems) {
          setCarts(cartUserItems);
        } else {
          console.error('Fetch cart that failed');
        }
      } catch (error) {
        console.error('Fetching cart failed:', error);
      }
    };
    if (user) {
      getAllCart();
    }
  }, [user]);

  const handleAddToCart = async () => {
    if (!user.id) {
      setShowCreateModalLogin(true);
      return;
    }
    if (selectedSize) {
      try {
        const existingItem = carts.find((item: CartItem) => item.productId === product.id && item.size === selectedSize.size);
        if (existingItem ) {
          const updatedItem: CartItem = {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
          };
          await updateCartItem(existingItem.id, updatedItem);
          toast.success('Added to cart successfully');
        } else {
          const newItem = await addToCart(user.id, product.id, quantity, selectedSize.size, product.price);
          if (newItem) {
            toast.success('Added to cart successfully');
          }
        }
      } catch (error) {
        console.error('Add to cart failed:', error);
        toast.error('Add to cart failed');
      }
    } else {
      toast.error('Please select a size');
    }
  };

  return (
    <>
      <TitilePage name="Product detail " />
      <div className="mx-20 my-10 rounded-lg bg-gray-100 p-4 shadow-lg">
        <div className="mb-10 mt-20 grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-0">
          {product.discount ? (
            <span className="absolute left-48 mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 p-3 text-white">-10%</span>
          ) : (
            ''
          )}
          <button className="left-30 absolute mt-48 w-10 text-2xl text-blue-600 hover:bg-blue-600" onClick={handleTurnBack}>
            <FontAwesomeIcon icon={faArrowLeft} className="text-2xl text-blue-600 hover:text-white" />
          </button>

          <div className="relative ml-40 w-72">
            <Image src={product.img} alt={product.name} fill style={{ objectFit: 'cover' }} className="rounded-none" />
          </div>
          <div className="flex flex-col justify-between p-4">
            <span className="mb-2 text-3xl font-bold">{product.name}</span>

            <div className="mt-4 flex items-center">
              {product.discount ? <span className="mr-4 text-xl text-red-500 line-through">${calculateDiscountedPrice(product.price)}</span> : ''}
              <span className="text-xl font-semibold">${product.price}</span>
            </div>

            <div className="mb-3 mt-2 flex items-center">
              <span className="mr-2 text-xl font-light text-gray-600">Shipping</span>
              <div className="relative h-10 w-12">
                <Image src="/shipping.png" alt="Shipping icon" fill style={{ objectFit: 'contain' }} className="ml-2" />
              </div>
            </div>

            <div className="mb-3 flex">
              <div className="mr-6 flex items-center overflow-hidden rounded-sm border">
                <button
                  type="button"
                  className="flex h-10 w-12 items-center justify-center border-r border-gray-300 bg-gray-100 text-gray-800"
                  onClick={() => handleQuantityChange('decrement')}
                >
                  -
                </button>
                <span className="flex h-10 w-12 items-center justify-center text-gray-800">{quantity}</span>
                <button
                  type="button"
                  className="flex h-10 w-12 items-center justify-center border-l border-gray-300 bg-gray-100 text-gray-800"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="h-10 w-32 rounded-sm bg-blue-600 text-white transition duration-200 hover:bg-black"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>

            <div className="">
              <span className="mr-2 text-lg font-light">Size</span>
              <div className="mt-2 flex flex-wrap space-x-2">
                {product.size
                  .filter((size) => size.quantity > 0)
                  .map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-sm border px-4 py-1 ${
                        selectedSize?.size === size.size ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {(product.categoryName === 'fashion' || product.categoryName === 'sport') && (
          <ProductPropose titleLeft="Related Products" items={relatedProducts} href="/" />
        )}
        <FamousBrand />
        <CreateModalLogin showCreateModalLogin={showCreateModalLogin} setShowCreateModalLogin={setShowCreateModalLogin} />
      </div>
    </>
  );
}
