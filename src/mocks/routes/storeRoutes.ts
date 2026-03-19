import { Response } from 'miragejs';
import { AppServer } from '../types';

export function storeRoutes(server: AppServer) {
  server.get('/stores', (schema: any) => {
    return schema.all('store').models;
  });

  server.get('/stores/:id', (schema: any, request: any) => {
    const store = schema.find('store', request.params.id);
    if (!store) return new Response(404, {}, { message: 'Store not found' });
    return store;
  });

  server.post('/stores', (schema: any, request: any) => {
    const body = JSON.parse(request.requestBody);
    return schema.create('store', { ...body, productCount: 0 });
  });

  server.put('/stores/:id', (schema: any, request: any) => {
    const body = JSON.parse(request.requestBody);
    const store = schema.find('store', request.params.id);
    if (!store) return new Response(404, {}, { message: 'Store not found' });
    return store.update(body);
  });

  server.del('/stores/:id', (schema: any, request: any) => {
    const store = schema.find('store', request.params.id);
    if (!store) return new Response(404, {}, { message: 'Store not found' });
    store.destroy();
    return new Response(204);
  });
}