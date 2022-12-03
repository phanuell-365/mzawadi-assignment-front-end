export interface SaleObject {
  id: string;
  ConsumerId: string;
  DistributorId: string;
  ProductId: string;
  quantitySold: number;
  totalAmount: number;
  soldAt: string;
}

export interface SaleObjectWithConsumerDistributorAndProduct {
  id: string;
  consumer: string;
  distributor: string;
  product: string;
  quantitySold: number;
  totalAmount: number;
  soldAt: string;
}

export interface CreateSale {
  ConsumerId: string;
  DistributorId: string;
  ProductId: string;
  quantitySold: number;
}
