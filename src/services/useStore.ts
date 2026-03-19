import { storeService } from '@/services/storeService';
import { CreateStoreDTO, Store, UpdateStoreDTO } from '@/types/store';
import { create } from 'zustand';

type StoreState = {
  stores: Store[];
  selectedStore: Store | null;
  isLoading: boolean;
  error: string | null;

  fetchStores: () => Promise<void>;
  fetchStoreById: (id: string) => Promise<void>;
  createStore: (data: CreateStoreDTO) => Promise<void>;
  updateStore: (id: string, data: UpdateStoreDTO) => Promise<void>;
  removeStore: (id: string) => Promise<void>;
  setSelectedStore: (store: Store | null) => void;
  clearError: () => void;
};

export const useStoreStore = create<StoreState>((set) => ({
  stores: [],
  selectedStore: null,
  isLoading: false,
  error: null,

  fetchStores: async () => {
    set({ isLoading: true, error: null });
    try {
      const stores = await storeService.getAll();
      set({ stores });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStoreById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const store = await storeService.getById(id);
      set({ selectedStore: store });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createStore: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newStore = await storeService.create(data);
      set((state) => ({ stores: [...state.stores, newStore] }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateStore: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await storeService.update(id, data);
      set((state) => ({
        stores: state.stores.map((s) => (s.id === id ? updated : s)),
        selectedStore: updated,
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  removeStore: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await storeService.remove(id);
      set((state) => ({
        stores: state.stores.filter((s) => s.id !== id),
        selectedStore: null,
      }));
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedStore: (store) => set({ selectedStore: store }),
  clearError: () => set({ error: null }),
}));