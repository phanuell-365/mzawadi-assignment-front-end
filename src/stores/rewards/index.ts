import { defineStore } from "pinia";
import {
  RewardObject,
  RewardObjectWithConsumerAndDistributor,
} from "./interfaces";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { useDistributorsStore } from "../distributors";
import { useConsumersStore } from "../consumers";

interface RewardsStoreState {
  rewards: RewardObject[];
  rewardsWithConsumerAndDistributor: RewardObjectWithConsumerAndDistributor[];
}

export const useRewardsStore = defineStore({
  id: "rewardsStore",
  state: (): RewardsStoreState => ({
    rewards: [],
    rewardsWithConsumerAndDistributor: [],
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

    async fetchRewardWithConsumerAndDistributor() {
      await this.fetchRewards();

      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      this.rewardsWithConsumerAndDistributor = await Promise.all(
        this.rewards.map(async (value) => {
          const distributor = await distributorsStore.fetchDistributorById(
            value.DistributorId
          );

          const consumer = await consumersStore.fetchConsumerById(
            value.ConsumerId
          );

          return {
            id: value.id,
            consumer: consumer.name,
            distributor: distributor.name,
            salesTarget: value.salesTarget,
            dateOfRebate: value.dateOfRebate,
            rebateAmount: value.rebateAmount,
          } as RewardObjectWithConsumerAndDistributor;
        })
      );

      return this.rewardsWithConsumerAndDistributor;
    },
  },
});
