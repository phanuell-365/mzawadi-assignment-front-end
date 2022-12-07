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
import moment from "moment";

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
  getters: {
    getSalesAttributes: () => [
      "id",
      "ConsumerId",
      "DistributorId",
      "ProductId",
      "quantitySold",
      "totalAmount",
      "soldAt",
    ],
    getSalesAttributesWithConsumerDistributorAndProduct: () => [
      "id",
      "consumer",
      "distributor",
      "product",
      "quantitySold",
      "totalAmount",
      "soldAt",
    ],
  },
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return "Bearer " + tokenStore.getStoredToken();
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

    async constructSaleWithConsumerAndDistributor(saleObject: SaleObject) {
      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      const productsStore = useProductsStore();

      const distributor = await distributorsStore.fetchDistributorById(
        saleObject.DistributorId
      );

      const consumer = await consumersStore.fetchConsumerById(
        saleObject.ConsumerId
      );

      const product = await productsStore.fetchProductById(
        saleObject.ProductId
      );

      const temp: SaleObjectWithConsumerDistributorAndProduct = {
        id: saleObject.id,
        consumer: consumer.name,
        distributor: distributor.name,
        product: product.name,
        quantitySold: saleObject.quantitySold,
        totalAmount: saleObject.totalAmount,
        soldAt: moment(saleObject.soldAt).format("MMMM Do YYYY h:mm:ss a"),
      };

      return temp;
    },

    async fetchSaleWithConsumerAndDistributorById(saleId: string) {
      return await this.constructSaleWithConsumerAndDistributor(
        await this.fetchSaleById(saleId)
      );
    },

    async fetchSaleWithConsumerAndDistributor() {
      await this.fetchSales();

      this.salesWithConsumerAndDistributor = await Promise.all(
        this.sales.map(async (value) => {
          return await this.constructSaleWithConsumerAndDistributor(value);
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
