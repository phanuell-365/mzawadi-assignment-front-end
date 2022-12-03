import { defineStore } from "pinia";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { ConsumerObject, CreateConsumer, UpdateConsumer } from "./interfaces";

interface ConsumersStoreState {
  consumers: ConsumerObject[];
}

export const useConsumersStore = defineStore({
  id: "consumersStore",
  state: (): ConsumersStoreState => ({
    consumers: [],
  }),
  getters: {},
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchConsumers() {
      const response = await fetch(`${BASE_URL}/consumers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.consumers = data as ConsumerObject[];

      return this.consumers;
    },

    async fetchConsumerById(consumerId: string) {
      const response = await fetch(`${BASE_URL}/consumers/${consumerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as ConsumerObject;
    },

    async createConsumer(consumerPayload: CreateConsumer) {
      const response = await fetch(`${BASE_URL}/consumers`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(consumerPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as ConsumerObject;
    },

    async updateConsumer(
      updateConsumerPayload: UpdateConsumer,
      consumerId: string
    ) {
      const response = await fetch(`${BASE_URL}/consumers/${consumerId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(updateConsumerPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as ConsumerObject;
    },

    async deleteConsumer(consumerId: string) {
      const response = await fetch(`${BASE_URL}/consumers/${consumerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data;
    },
  },
});
