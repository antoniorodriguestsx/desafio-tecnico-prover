import { CreateStoreDTO, Store, UpdateStoreDTO } from '@/types/store';

const BASE_URL = 'http://localhost';

export const storeService = {
  async getAll(): Promise<Store[]> {
    const response = await fetch(`${BASE_URL}/stores`);
    if (!response.ok) throw new Error('Erro ao buscar lojas');
    return response.json();
  },

  async getById(id: string): Promise<Store> {
    const response = await fetch(`${BASE_URL}/stores/${id}`);
    if (!response.ok) throw new Error('Loja não encontrada');
    return response.json();
  },

  async create(data: CreateStoreDTO): Promise<Store> {
    const response = await fetch(`${BASE_URL}/stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar loja');
    return response.json();
  },

  async update(id: string, data: UpdateStoreDTO): Promise<Store> {
    const response = await fetch(`${BASE_URL}/stores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar loja');
    return response.json();
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/stores/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao remover loja');
  },
};