import { Server } from 'miragejs';

export type AppServer = Server<any>;
export type AppSchema = any;

export type StoreAttrs = {
  id: string;
  name: string;
  address: string;
  productCount: number;
};

export type ProductAttrs = {
  id: string;
  storeId: string;
  name: string;
  category: string;
  price: number;
};