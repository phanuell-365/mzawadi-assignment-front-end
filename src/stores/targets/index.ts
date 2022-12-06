import { defineStore } from "pinia";
import { BASE_URL } from "../constants/base-url";
import { useTokenStore } from "../auth/token";
import {
  CreateTarget,
  TargetObject,
  TargetObjectWithDistributorAndProduct,
  UpdateTarget,
} from "./interfaces";
import { useDistributorsStore } from "../distributors";
import { useProductsStore } from "../products";

interface TargetsStoreState {
  targets: TargetObject[];
  targetsWithDistributorAndProduct: TargetObjectWithDistributorAndProduct[];
}

export const useTargetsStore = defineStore({
  id: "targetsStore",
  state: (): TargetsStoreState => ({
    targets: [],
    targetsWithDistributorAndProduct: [],
  }),
  getters: {
    getTargetsAttributes: () => [
      "id",
      "DistributorId",
      "ProductId",
      "salesTarget",
    ],
    getTargetsAttributesWithDistributorAndProduct: () => [
      "id",
      "distributor",
      "product",
      "salesTarget",
    ],
  },
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchTargets() {
      const response = await fetch(`${BASE_URL}/targets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.targets = data as TargetObject[];

      return this.targets;
    },

    async constructTargetWithDistributorAndProduct(targetObject: TargetObject) {
      const distributorsStore = useDistributorsStore();

      const productsStore = useProductsStore();

      const distributor = await distributorsStore.fetchDistributorById(
        targetObject.DistributorId
      );

      const product = await productsStore.fetchProductById(
        targetObject.ProductId
      );

      const temp: TargetObjectWithDistributorAndProduct = {
        id: targetObject.id,
        distributor: distributor.name,
        product: product.name,
        salesTarget: targetObject.salesTarget,
      };
      return temp;
    },

    async fetchTargetWithDistributorAndProductById(targetId: string) {
      return await this.constructTargetWithDistributorAndProduct(
        await this.fetchTargetById(targetId)
      );
    },

    async fetchTargetWithDistributorAndProduct() {
      await this.fetchTargets();

      this.targetsWithDistributorAndProduct = await Promise.all(
        this.targets.map(async (value) => {
          return await this.constructTargetWithDistributorAndProduct(value);
        })
      );

      return this.targetsWithDistributorAndProduct;
    },

    async fetchTargetById(targetId: string) {
      const response = await fetch(`${BASE_URL}/targets/${targetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as TargetObject;
    },

    async createTarget(targetPayload: CreateTarget) {
      const response = await fetch(`${BASE_URL}/targets`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(targetPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as TargetObject;
    },

    async updateTarget(updateTargetPayload: UpdateTarget, targetId: string) {
      const response = await fetch(`${BASE_URL}/targets/${targetId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(updateTargetPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as TargetObject;
    },
    async deleteTarget(targetId: string) {
      const response = await fetch(`${BASE_URL}/targets/${targetId}`, {
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
