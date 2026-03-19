export type Product = {
  id: string;
  storeId: string;
  name: string;
  category: string;
  price: number;
};

export type CreateProductDTO = {
  storeId: string;
  name: string;
  category: string;
  price: number;
};

export type UpdateProductDTO = Partial<Omit<CreateProductDTO, 'storeId'>>;