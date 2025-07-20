'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { toast } from 'sonner';
import GmailProfileWatcher from '@/components/GmailProfileWatcher';
import { IExtraPrice } from '@/models/MenuItem';
import { CartProduct, ClientMenuItem } from '../../types/cart';

export interface CartContextType {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addToCart: (
    product: ClientMenuItem,
    size?: IExtraPrice | null,
    extras?: IExtraPrice[]
  ) => void;
  removeCartProduct: (indexToRemove: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function cartProductPrice(cartProduct: CartProduct): number {
  let price = cartProduct.basePrice;
  if (cartProduct.size) price += cartProduct.size.price;
  if (cartProduct.extras?.length) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart') || '[]'));
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove: number) {
    setCartProducts(prev => {
      const updated = prev.filter((_, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(updated);
      return updated;
    });
    toast.success('Product removed');
  }

  function saveCartProductsToLocalStorage(products: CartProduct[]) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(products));
    }
  }

  function addToCart(
    product: ClientMenuItem,
    size: IExtraPrice | null = null,
    extras: IExtraPrice[] = []
  ) {
    const cartProduct: CartProduct = { ...product, size: size || undefined, extras };
    setCartProducts(prev => {
      const updated = [...prev, cartProduct];
      saveCartProductsToLocalStorage(updated);
      return updated;
    });
  }

  return (
    <SessionProvider>
      <GmailProfileWatcher />
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default Providers;