export interface PointObject {
  id: string;
  SaleId: string;
  points: number;
  valueOfPoints: number;
}

export interface PointObjectWithConsumerProductAndDistributorId {
  id: string;
  DistributorId: string;
  ConsumerId: string;
  ProductId: string;
  points: number;
  valueOfPoints: number;
}

export interface PointObjectWithConsumerProductAndDistributor {
  id: string;
  distributor: string;
  consumer: string;
  product: string;
  points: number;
  valueOfPoints: number;
}
