import { useContext } from 'react';
import { CartContext } from './CartContext.js';

export const useCart = () => {
  return useContext(CartContext);
};