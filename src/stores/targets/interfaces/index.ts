export interface CreateTarget {
  DistributorId: string;
  ProductId: string;
  salesTarget: number;
}

export interface TargetObject {
  id: string;
  DistributorId: string;
  ProductId: string;
  salesTarget: number;
}

export interface UpdateTarget {
  DistributorId: string;
  ProductId: string;
  salesTarget: number;
}

export interface TargetObjectWithDistributorAndProduct {
  id: string;
  distributor: string;
  product: string;
  salesTarget: number;
}
