import { useContext } from "react";
import { CartContext, CartContextType } from "@/app/providers"; // путь подстрой под себя


export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContext.Provider");
  }
  return context;
};