import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJs from "crypto-js";
import { CartItem } from "./store/features/cart/cartSlice";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });
  const hash = CryptoJs.SHA256(jsonString).toString();
  return hash;
}

export function getFromPrice(product: Product): number{
  const basePrice = Object.entries(product.priceConfiguration).filter(([Key, value]) => {
     return value.priceType === 'base'
  }).reduce((acc, [key, value]) => {
     const smallestPrice = Math.min(...Object.values(value.availableOptions))
     return acc + smallestPrice
  }, 0)
   return basePrice
}
