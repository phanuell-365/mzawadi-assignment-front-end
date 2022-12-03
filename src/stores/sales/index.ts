import { defineStore } from "pinia";
import {
  CreateSale,
  SaleObject,
  SaleObjectWithConsumerDistributorAndProduct,
} from "./interfaces";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { useDistributorsStore } from "../distributors";
import { useConsumersStore } from "../consumers";
import { useProductsStore } from "../products";

interface SalesStoreState {
  sales: SaleObject[];
  salesWithConsumerAndDistributor: SaleObjectWithConsumerDistributorAndProduct[];
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

      const productsStore = useProductsStore();

      this.salesWithConsumerAndDistributor = await Promise.all(
        this.sales.map(async (value) => {
          const distributor = await distributorsStore.fetchDistributorById(
            value.DistributorId
          );

          const consumer = await consumersStore.fetchConsumerById(
            value.ConsumerId
          );

          const product = await productsStore.fetchProductById(value.ProductId);

          const temp: SaleObjectWithConsumerDistributorAndProduct = {
            id: value.id,
            consumer: consumer.name,
            distributor: distributor.name,
            product: product.name,
            quantitySold: value.quantitySold,
            totalAmount: value.totalAmount,
            soldAt: value.soldAt,
          };

          return temp;
        })
      );

      return this.salesWithConsumerAndDistributor;
    },

    async createSale(salePayload: CreateSale) {
      const response = await fetch(`${BASE_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(salePayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as SaleObject;
    },
  },
});
