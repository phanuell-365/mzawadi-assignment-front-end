export interface RewardObject {
  id: string;
  ProductId: string;
  DistributorId: string;
  salesTarget: number;
  rebateAmount: number;
  dateOfRebate: string;
}

export interface RewardObjectWithConsumerAndProduct {
  id: string;
  product: string;
  distributor: string;
  salesTarget: number;
  rebateAmount: number;
  dateOfRebate: string;
}
