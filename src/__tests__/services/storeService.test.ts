import { makeTestServer } from '@/mocks/testSetup';
import { StoreAttrs } from '@/mocks/types';

let server: ReturnType<typeof makeTestServer>;

beforeEach(() => {
  server = makeTestServer();
});

afterEach(() => {
  server.shutdown();
});

describe('storeService.getAll', () => {
  it('retorna lista de lojas', () => {
    const stores = server.schema.all('store').models;
    expect(stores.length).toBeGreaterThan(0);
    expect(stores[0].attrs).toHaveProperty('name');
    expect(stores[0].attrs).toHaveProperty('address');
  });
});

describe('storeService.getById', () => {
  it('retorna uma loja pelo id', () => {
    const store = server.schema.find('store', '1');
    expect(store).not.toBeNull();
    expect((store!.attrs as StoreAttrs).id).toBe('1');
  });

  it('retorna null para loja inexistente', () => {
    const store = server.schema.find('store', '999');
    expect(store).toBeNull();
  });
});

describe('storeService.create', () => {
  it('cria uma nova loja com productCount zerado', () => {
    const store = server.schema.create('store', {
      name: 'Loja Teste',
      address: 'Rua Teste, 123',
      productCount: 0,
    } as any);

    expect((store.attrs as StoreAttrs).name).toBe('Loja Teste');
    expect((store.attrs as StoreAttrs).productCount).toBe(0);
  });

  it('loja criada aparece na listagem', () => {
    server.schema.create('store', {
      name: 'Loja Nova',
      address: 'Av. Nova, 456',
      productCount: 0,
    } as any);

    const stores = server.schema.all('store').models;
    expect(stores.some((s) => (s.attrs as StoreAttrs).name === 'Loja Nova')).toBe(true);
  });
});

describe('storeService.update', () => {
  it('atualiza uma loja existente', () => {
    const store = server.schema.find('store', '1');
    store!.update({ name: 'Loja Atualizada' });

    const updated = server.schema.find('store', '1');
    expect((updated!.attrs as StoreAttrs).name).toBe('Loja Atualizada');
  });

  it('não encontra loja inexistente para atualizar', () => {
    const store = server.schema.find('store', '999');
    expect(store).toBeNull();
  });
});

describe('storeService.remove', () => {
  it('remove uma loja existente', () => {
    server.schema.find('store', '1')!.destroy();
    const store = server.schema.find('store', '1');
    expect(store).toBeNull();
  });

  it('não encontra loja inexistente para remover', () => {
    const store = server.schema.find('store', '999');
    expect(store).toBeNull();
  });
});