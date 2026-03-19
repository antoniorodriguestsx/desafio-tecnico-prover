import { makeTestServer } from '../testSetup';
import { ProductAttrs, StoreAttrs } from '../types';

let server: ReturnType<typeof makeTestServer>;

beforeEach(() => {
  server = makeTestServer();
});

afterEach(() => {
  server.shutdown();
});

describe('products', () => {
  it('lista produtos de uma loja', () => {
    const products = server.schema
      .all('product')
      .models.filter((p: any) => (p.attrs as ProductAttrs).storeId === '1');

    expect(products.length).toBeGreaterThan(0);
    expect(products[0].attrs).toHaveProperty('name');
    expect(products[0].attrs).toHaveProperty('price');
  });

  it('retorna vazio para loja sem produtos', () => {
    const products = server.schema
      .all('product')
      .models.filter((p: any) => (p.attrs as ProductAttrs).storeId === '999');

    expect(products).toEqual([]);
  });

  it('cria produto e incrementa productCount da loja', () => {
    const store = server.schema.find('store', '1');
    const countBefore = (store!.attrs as StoreAttrs).productCount;

    server.schema.create('product', {
      storeId: '1',
      name: 'Produto Teste',
      category: 'Teste',
      price: 99.9,
    } as any);

    store!.update({ productCount: countBefore + 1 });

    const updated = server.schema.find('store', '1');
    expect((updated!.attrs as StoreAttrs).productCount).toBe(countBefore + 1);
  });

  it('atualiza um produto', () => {
    const product = server.schema.find('product', '1');
    product!.update({ name: 'Produto Atualizado', price: 199.9 });

    const updated = server.schema.find('product', '1');
    expect((updated!.attrs as ProductAttrs).name).toBe('Produto Atualizado');
    expect((updated!.attrs as ProductAttrs).price).toBe(199.9);
  });

  it('remove produto e decrementa productCount da loja', () => {
    const product = server.schema.find('product', '1');
    const storeId = (product!.attrs as ProductAttrs).storeId;
    const store = server.schema.find('store', storeId);
    const countBefore = (store!.attrs as StoreAttrs).productCount;

    product!.destroy();
    store!.update({ productCount: countBefore - 1 });

    const updated = server.schema.find('store', storeId);
    expect((updated!.attrs as StoreAttrs).productCount).toBe(countBefore - 1);
  });
});