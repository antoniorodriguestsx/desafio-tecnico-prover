import { createServer, Model } from 'miragejs';
import { products as initialProducts } from './data/products';
import { stores as initialStores } from './data/stores';
import { productRoutes } from './routes/productRoutes';
import { storeRoutes } from './routes/storeRoutes';

export function startMockServer() {
  createServer({
    models: {
      store: Model.extend({}),
      product: Model.extend({}),
    },

    seeds(server) {
      initialStores.forEach((store) => server.create('store', store as any));
      initialProducts.forEach((product) => server.create('product', product as any));
    },

    routes() {
      this.namespace = '';
      this.timing = 400;

      storeRoutes(this as any);
      productRoutes(this as any);
    },
  });

  console.log('[Mirage] Mock server started');
}