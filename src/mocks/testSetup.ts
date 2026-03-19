import { createServer, Model } from 'miragejs';
import { products as initialProducts } from './data/products';
import { stores as initialStores } from './data/stores';
import { productRoutes } from './routes/productRoutes';
import { storeRoutes } from './routes/storeRoutes';

export const BASE_URL = 'http://localhost';

export function makeTestServer() {
  const server = createServer({
    environment: 'test',
    models: {
      store: Model.extend({}),
      product: Model.extend({}),
    },
    routes() {
      this.namespace = '';
      storeRoutes(this as any);
      productRoutes(this as any);
    },
  });

  initialStores.forEach((store) => server.create('store', store as any));
  initialProducts.forEach((product) => server.create('product', product as any));

  return server;
}