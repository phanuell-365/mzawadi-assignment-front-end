import { defineStore } from "pinia";
import { SaleObject, SaleObjectWithConsumerAndDistributor } from "./interfaces";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { useDistributorsStore } from "../distributors";
import { useConsumersStore } from "../consumers";

interface SalesStoreState {
  sales: SaleObject[];
  salesWithConsumerAndDistributor: SaleObjectWithConsumerAndDistributor[];
}

export const useSalesStore = defineStore({
  id: "salesStore",
  state: (): SalesStoreState => ({
    sales: [],
    salesWithConsumerAndDistributor: [],
  }),
  getters: {},
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchSales() {
      const response = await fetch(`${BASE_URL}/sales`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.sales = data as SaleObject[];

      return this.sales;
    },

    async fetchSaleById(saleId: string) {
      const response = await fetch(`${BASE_URL}/sales/${saleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as SaleObject;
    },

    async fetchSaleWithConsumerAndDistributor() {
      await this.fetchSales();

      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      this.salesWithConsumerAndDistributor = await Promise.all(
        this.sales.map(async (value) => {
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
            quantitySold: value.quantitySold,
            totalAmount: value.totalAmount,
          } as SaleObjectWithConsumerAndDistributor;
        })
      );

      return this.salesWithConsumerAndDistributor;
    },
  },
});
