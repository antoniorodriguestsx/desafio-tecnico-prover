import { createServer, Model } from 'miragejs';
import { products as initialProducts } from './data/products';
import { stores as initialStores } from './data/stores';

export function makeTestServer() {
  const server = createServer({
    environment: 'test',
    models: {
      store: Model.extend({}),
      product: Model.extend({}),
    },
  });
  
  initialStores.forEach((store) => server.create('store', store as any));
  initialProducts.forEach((product) => server.create('product', product as any));

  return server;
}