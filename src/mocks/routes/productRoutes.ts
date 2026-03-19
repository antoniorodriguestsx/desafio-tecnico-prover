import { Response } from 'miragejs';
import { AppServer } from '../types';

export function productRoutes(server: AppServer) {
  server.get('/stores/:storeId/products', (schema: any, request: any) => {
    return schema
      .all('product')
      .models.filter((p: any) => p.storeId === request.params.storeId);
  });

  server.post('/products', (schema: any, request: any) => {
    const body = JSON.parse(request.requestBody);
    const product = schema.create('product', body);

    const store = schema.find('store', body.storeId);
    if (store) {
      const current = store.productCount || 0;
      store.update({ productCount: current + 1 });
    }

    return product;
  });

  server.put('/products/:id', (schema: any, request: any) => {
    const body = JSON.parse(request.requestBody);
    const product = schema.find('product', request.params.id);
    if (!product) return new Response(404, {}, { message: 'Product not found' });
    return product.update(body);
  });

  server.del('/products/:id', (schema: any, request: any) => {
    const product = schema.find('product', request.params.id);
    if (!product) return new Response(404, {}, { message: 'Product not found' });

    const store = schema.find('store', product.storeId);
    if (store) {
      const current = store.productCount || 0;
      store.update({ productCount: Math.max(0, current - 1) });
    }

    product.destroy();
    return new Response(204);
  });
}