import { defineStore } from "pinia";
import { RewardObject, RewardObjectWithConsumerAndProduct } from "./interfaces";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { useDistributorsStore } from "../distributors";
import { useProductsStore } from "../products";

interface RewardsStoreState {
  rewards: RewardObject[];
  rewardsWithConsumerAndProduct: RewardObjectWithConsumerAndProduct[];
}

export const useRewardsStore = defineStore({
  id: "rewardsStore",
  state: (): RewardsStoreState => ({
    rewards: [],
    rewardsWithConsumerAndProduct: [],
  }),
  getters: {},
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchRewards() {
      const response = await fetch(`${BASE_URL}/rewards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.rewards = data as RewardObject[];

      return this.rewards;
    },

    async fetchRewardById(rewardId: string) {
      const response = await fetch(`${BASE_URL}/rewards/${rewardId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as RewardObject;
    },

    async fetchRewardWithProductAndDistributor() {
      await this.fetchRewards();

      const distributorsStore = useDistributorsStore();

      const productsStore = useProductsStore();

      this.rewardsWithConsumerAndProduct = await Promise.all(
        this.rewards.map(async (value) => {
          const distributor = await distributorsStore.fetchDistributorById(
            value.DistributorId
          );

          const product = await productsStore.fetchProductById(value.ProductId);

          const temp: RewardObjectWithConsumerAndProduct = {
            id: value.id,
            product: product.name,
            distributor: distributor.name,
            salesTarget: value.salesTarget,
            dateOfRebate: value.dateOfRebate,
            rebateAmount: value.rebateAmount,
          };

          return temp;
        })
      );

      return this.rewardsWithConsumerAndProduct;
    },
  },
});
