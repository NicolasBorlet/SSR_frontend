import { atom } from "recoil";
import { Product } from "../types/product";

export const productAtom = atom<Product[]>({
  key: "productAtom",
  default: [],
});

export const productTypeAtom = atom({
  key: "productTypeAtom",
  default: "shoes",
});

export const visibleAtom = atom({
  key: "visibleAtom",
  default: false,
});
