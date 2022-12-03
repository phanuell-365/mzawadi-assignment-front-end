export interface CreateDistributor {
  name: string;
  email: string;
  phone: string;
}

export interface DistributorObject {
  id: string;
  name: string;
  phone: string;
  email: string;
  rewardAmount: number;
}

export interface UpdateDistributor {
  name?: string;
  email?: string;
  phone?: string;
}
