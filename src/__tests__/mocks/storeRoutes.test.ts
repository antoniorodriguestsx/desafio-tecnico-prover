import { makeTestServer } from '../../mocks/testSetup';
import { StoreAttrs } from '../../mocks/types';

let server: ReturnType<typeof makeTestServer>;

beforeEach(() => {
  server = makeTestServer();
});

afterEach(() => {
  server.shutdown();
});

describe('stores', () => {
  it('lista todas as lojas', () => {
    const stores = server.schema.all('store').models;
    expect(stores.length).toBeGreaterThan(0);
    expect(stores[0].attrs).toHaveProperty('name');
    expect(stores[0].attrs).toHaveProperty('address');
  });

  it('encontra loja por id', () => {
    const store = server.schema.find('store', '1');
    expect(store).not.toBeNull();
    expect((store!.attrs as StoreAttrs).id).toBe('1');
  });

  it('cria uma nova loja', () => {
    const store = server.schema.create('store', {
      name: 'Loja Teste',
      address: 'Rua Teste, 123',
      productCount: 0,
    } as any);

    expect((store.attrs as StoreAttrs).name).toBe('Loja Teste');
    expect((store.attrs as StoreAttrs).productCount).toBe(0);
  });

  it('atualiza uma loja', () => {
    const store = server.schema.find('store', '1');
    store!.update({ name: 'Loja Atualizada' });
    const updated = server.schema.find('store', '1');
    expect((updated!.attrs as StoreAttrs).name).toBe('Loja Atualizada');
  });

  it('remove uma loja', () => {
    server.schema.find('store', '1')!.destroy();
    const store = server.schema.find('store', '1');
    expect(store).toBeNull();
  });
});