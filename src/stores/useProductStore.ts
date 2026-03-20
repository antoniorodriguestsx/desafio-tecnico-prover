import { productService } from '@/services/productService';
import { CreateProductDTO, Product, UpdateProductDTO } from '@/types/product';
import { create } from 'zustand';

type ProductState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;

  fetchProducts: (storeId: string) => Promise<void>;
  createProduct: (data: CreateProductDTO) => Promise<void>;
  updateProduct: (id: string, data: UpdateProductDTO) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  clearError: () => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (storeId) => {
    set({ isLoading: true, error: null });
    try {
      const products = await productService.getByStore(storeId);
      set({ products });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct = await productService.create(data);
      set((state) => ({ products: [...state.products, newProduct] }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await productService.update(id, data);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  removeProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await productService.remove(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));