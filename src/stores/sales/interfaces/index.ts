export interface SaleObject {
  id: string;
  ConsumerId: string;
  DistributorId: string;
  quantitySold: number;
  totalAmount: number;
}

export interface SaleObjectWithConsumerAndDistributor {
  id: string;
  consumer: string;
  distributor: string;
  quantitySold: number;
  totalAmount: number;
}
