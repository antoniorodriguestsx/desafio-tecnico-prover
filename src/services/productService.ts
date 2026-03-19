import { CreateProductDTO, Product, UpdateProductDTO } from '@/types/product';

const BASE_URL = 'http://localhost';

export const productService = {
  async getByStore(storeId: string): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/stores/${storeId}/products`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return response.json();
  },

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar produto');
    return response.json();
  },

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return response.json();
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao remover produto');
  },
};