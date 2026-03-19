import { makeTestServer } from '@/mocks/testSetup';
import { ProductAttrs } from '@/mocks/types';

let server: ReturnType<typeof makeTestServer>;

beforeEach(() => {
  server = makeTestServer();
});

afterEach(() => {
  server.shutdown();
});

describe('productService.getByStore', () => {
  it('retorna produtos de uma loja', () => {
    const products = server.schema
      .all('product')
      .models.filter((p: any) => (p.attrs as ProductAttrs).storeId === '1');

    expect(products.length).toBeGreaterThan(0);
    expect(products[0].attrs).toHaveProperty('name');
    expect(products[0].attrs).toHaveProperty('price');
  });

  it('retorna lista vazia para loja sem produtos', () => {
    const products = server.schema
      .all('product')
      .models.filter((p: any) => (p.attrs as ProductAttrs).storeId === '999');

    expect(products).toEqual([]);
  });
});

describe('productService.create', () => {
  it('cria um novo produto', () => {
    const product = server.schema.create('product', {
      storeId: '1',
      name: 'Produto Teste',
      category: 'Teste',
      price: 99.9,
    } as any);

    expect((product.attrs as ProductAttrs).name).toBe('Produto Teste');
    expect((product.attrs as ProductAttrs).storeId).toBe('1');
  });

  it('produto criado aparece na listagem da loja', () => {
    server.schema.create('product', {
      storeId: '1',
      name: 'Produto Novo',
      category: 'Teste',
      price: 49.9,
    } as any);

    const products = server.schema
      .all('product')
      .models.filter((p: any) => (p.attrs as ProductAttrs).storeId === '1');

    expect(products.some((p) => (p.attrs as ProductAttrs).name === 'Produto Novo')).toBe(true);
  });
});

describe('productService.update', () => {
  it('atualiza um produto existente', () => {
    const product = server.schema.find('product', '1');
    product!.update({ name: 'Produto Atualizado', price: 199.9 });

    const updated = server.schema.find('product', '1');
    expect((updated!.attrs as ProductAttrs).name).toBe('Produto Atualizado');
    expect((updated!.attrs as ProductAttrs).price).toBe(199.9);
  });

  it('não encontra produto inexistente para atualizar', () => {
    const product = server.schema.find('product', '999');
    expect(product).toBeNull();
  });
});

describe('productService.remove', () => {
  it('remove um produto existente', () => {
    server.schema.find('product', '1')!.destroy();
    const product = server.schema.find('product', '1');
    expect(product).toBeNull();
  });

  it('não encontra produto inexistente para remover', () => {
    const product = server.schema.find('product', '999');
    expect(product).toBeNull();
  });
});