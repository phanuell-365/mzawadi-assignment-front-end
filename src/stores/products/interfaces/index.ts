export interface CreateProduct {
  name: string;
  price: number;
}

export interface ProductObject {
  id: string;
  name: string;
  price: number;
}

export interface UpdateProduct {
  name?: string;
  price?: number;
}
