'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllProduct } from '@/app/services/config';
import { Product, SaleOffContextType } from '@/app/types';

const SaleOffContext = createContext<SaleOffContextType>({ saleOffProducts: [], popularProducts: [] });

export const useSaleOff = () => useContext(SaleOffContext);

export const SaleOffProvider = ({ children }: { children: ReactNode }) => {
  const [saleOffProducts, setSaleOffProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSaleOffProducts = async () => {
      try {
        const data = await getAllProduct();
        const dataDiscount = data.filter((product: Product) => product.discount && product.status === 'active');
        if (dataDiscount) {
          setSaleOffProducts(dataDiscount);
        } else {
          console.error('No discount products found');
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
        const data = await getAllProduct();
        const dataPopular = data.filter((product: Product) => product.price >= 90 && product.status === 'active');
        if (dataPopular) {
          setPopularProducts(dataPopular);
        } else {
          console.error('No popular products found');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchPopularProducts();
  }, []);

  return <SaleOffContext.Provider value={{ saleOffProducts, popularProducts }}>{children}</SaleOffContext.Provider>;
};
