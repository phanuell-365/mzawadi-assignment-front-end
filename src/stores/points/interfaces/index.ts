export interface PointObject {
  id: string;
  SaleId: string;
  points: number;
  valueOfPoints: number;
}

export interface PointObjectWithConsumerAndDistributorId {
  id: string;
  DistributorId: string;
  ConsumerId: string;
  points: number;
  valueOfPoints: number;
}

export interface PointObjectWithConsumerAndDistributor {
  id: string;
  distributor: string;
  consumer: string;
  points: number;
  valueOfPoints: number;
}
