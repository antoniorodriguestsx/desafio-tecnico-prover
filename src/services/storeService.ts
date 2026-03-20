import { CreateStoreDTO, Store, UpdateStoreDTO } from '@/types/store';

const BASE_URL = '';

export const storeService = {
  async getAll(): Promise<Store[]> {
    const response = await fetch(`${BASE_URL}/stores`);
    if (!response.ok) throw new Error('Erro ao buscar lojas');
    const data = await response.json();
    return data.stores ?? data;
  },

  async getById(id: string): Promise<Store> {
    const response = await fetch(`${BASE_URL}/stores/${id}`);
    if (!response.ok) throw new Error('Loja não encontrada');
    const data = await response.json();
    return data.store ?? data;
  },

  async create(data: CreateStoreDTO): Promise<Store> {
    const response = await fetch(`${BASE_URL}/stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar loja');
    const result = await response.json();
    return result.store ?? result;
  },

  async update(id: string, data: UpdateStoreDTO): Promise<Store> {
    const response = await fetch(`${BASE_URL}/stores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar loja');
    const result = await response.json();
    return result.store ?? result;
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/stores/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao remover loja');
  },
};