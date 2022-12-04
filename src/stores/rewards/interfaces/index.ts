export interface RewardObject {
  id: string;
  ProductId: string;
  DistributorId: string;
  rebateAmount: number;
  dateOfRebate: string;
}

export interface RewardObjectWithConsumerAndProduct {
  id: string;
  product: string;
  distributor: string;
  rebateAmount: number;
  dateOfRebate: string;
}
