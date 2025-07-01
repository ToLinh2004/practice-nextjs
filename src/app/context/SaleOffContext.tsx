'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllProduct } from '@/app/services/config';
import { Product, SaleOffContextType } from '@/app/types';
import NotFound from '@/app/not-found';

const SaleOffContext = createContext<SaleOffContextType>({ saleOffProducts: [], popularProducts: [] });

export const useSaleOff = () => useContext(SaleOffContext);

export const SaleOffProvider = ({ children }: { children: ReactNode }) => {
  const [saleOffProducts, setSaleOffProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSaleOffProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const { success, data } = await res.json();
        if (success) {
          const dataDiscount = data.filter((product: Product) => product.discount && product.status === 'active');
          if (dataDiscount) {
            setSaleOffProducts(dataDiscount);
          } else {
            NotFound();
          }
        } else {
          NotFound();
          return;
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchSaleOffProducts();
  }, []);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const { success, data } = await res.json();
        if (success) {
          const dataPopular = data.filter((product: Product) => product.price >= 90 && product.status === 'active');
          if (dataPopular) {
            setPopularProducts(dataPopular);
          } else {
            NotFound();
          }
        } else {
          NotFound();
          return;
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchPopularProducts();
  }, []);

  return <SaleOffContext.Provider value={{ saleOffProducts, popularProducts }}>{children}</SaleOffContext.Provider>;
};
