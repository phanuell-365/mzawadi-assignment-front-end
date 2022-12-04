import { defineStore } from "pinia";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import {
  CreateDistributor,
  DistributorObject,
  UpdateDistributor,
} from "./interfaces";

interface DistributorsStoreState {
  distributors: DistributorObject[];
}

export const useDistributorsStore = defineStore({
  id: "distributorsStore",
  state: (): DistributorsStoreState => ({
    distributors: [],
  }),
  getters: {
    getDistributorAttributes: () => [
      "id",
      "name",
      "email",
      "phone",
      "rebateAmount",
    ],
  },
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchDistributors() {
      const response = await fetch(`${BASE_URL}/distributors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.distributors = data as DistributorObject[];

      return this.distributors;
    },

    async fetchDistributorById(distributorId: string) {
      const response = await fetch(
        `${BASE_URL}/distributors/${distributorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: await this.getToken(),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as DistributorObject;
    },

    async createDistributor(distributorPayload: CreateDistributor) {
      const response = await fetch(`${BASE_URL}/distributors`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(distributorPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as DistributorObject;
    },

    async updateDistributor(
      updateDistributorPayload: UpdateDistributor,
      distributorId: string
    ) {
      const response = await fetch(
        `${BASE_URL}/distributors/${distributorId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: await this.getToken(),
          },
          body: JSON.stringify(updateDistributorPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as DistributorObject;
    },

    async deleteDistributor(distributorId: string) {
      const response = await fetch(
        `${BASE_URL}/distributors/${distributorId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: await this.getToken(),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data;
    },
  },
});
