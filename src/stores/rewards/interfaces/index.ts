export interface RewardObject {
  id: string;
  ConsumerId: string;
  DistributorId: string;
  salesTarget: number;
  rebateAmount: number;
  dateOfRebate: string;
}

export interface RewardObjectWithConsumerAndDistributor {
  id: string;
  consumer: string;
  distributor: string;
  salesTarget: number;
  rebateAmount: number;
  dateOfRebate: string;
}
