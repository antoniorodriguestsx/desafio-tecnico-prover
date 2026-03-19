export type Store = {
  id: string;
  name: string;
  address: string;
  productCount: number;
};

export type CreateStoreDTO = {
  name: string;
  address: string;
};

export type UpdateStoreDTO = Partial<CreateStoreDTO>;