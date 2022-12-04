import { defineStore } from "pinia";
import {
  PointObject,
  PointObjectWithConsumerProductAndDistributor,
  PointObjectWithConsumerProductAndDistributorId,
} from "./interfaces";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { useDistributorsStore } from "../distributors";
import { useConsumersStore } from "../consumers";
import { useSalesStore } from "../sales";
import { useProductsStore } from "../products";

interface PointsStateStore {
  points: PointObject[];
  pointsWithConsumerProductAndDistributorDataId: PointObjectWithConsumerProductAndDistributorId[];
  pointsWithConsumerProductAndDistributorData: PointObjectWithConsumerProductAndDistributor[];
}

export const usePointsStore = defineStore({
  id: "pointsStore",
  state: (): PointsStateStore => ({
    points: [],
    pointsWithConsumerProductAndDistributorData: [],
    pointsWithConsumerProductAndDistributorDataId: [],
  }),
  getters: {
    getPointsAttributes: () => [
      "id",
      "ConsumerId",
      "DistributorId",
      "ProductId",
      "points",
      "valueOfPoints",
    ],
    getPointsAttributesWithConsumerProductAndDistributor: () => [
      "id",
      "consumer",
      "distributor",
      "product",
      "points",
      "valueOfPoints",
    ],
  },
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchPoints() {
      const response = await fetch(`${BASE_URL}/points`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.points = data as PointObject[];

      return this.points;
    },

    async fetchPointsWithConsumerAndDistributorDataId() {
      await this.fetchPoints();

      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      const productsStore = useProductsStore();

      const salesStore = useSalesStore();

      this.pointsWithConsumerProductAndDistributorDataId = await Promise.all(
        this.points.map(async (value) => {
          const sale = await salesStore.fetchSaleById(value.SaleId);

          const distributor = await distributorsStore.fetchDistributorById(
            sale.DistributorId
          );

          const consumer = await consumersStore.fetchConsumerById(
            sale.ConsumerId
          );

          const product = await productsStore.fetchProductById(sale.ProductId);

          const temp: PointObjectWithConsumerProductAndDistributorId = {
            id: value.id,
            ConsumerId: consumer.id,
            DistributorId: distributor.id,
            ProductId: product.id,
            points: value.points,
            valueOfPoints: value.valueOfPoints,
          };

          return temp;
        })
      );

      return this.pointsWithConsumerProductAndDistributorDataId;
    },

    async fetchPointsWithConsumerAndDistributorData() {
      await this.fetchPointsWithConsumerAndDistributorDataId();

      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      const productsStore = useProductsStore();

      this.pointsWithConsumerProductAndDistributorData = await Promise.all(
        this.pointsWithConsumerProductAndDistributorDataId.map(
          async (value) => {
            const distributor = await distributorsStore.fetchDistributorById(
              value.DistributorId
            );

            const consumer = await consumersStore.fetchConsumerById(
              value.ConsumerId
            );

            const product = await productsStore.fetchProductById(
              value.ProductId
            );

            const temp: PointObjectWithConsumerProductAndDistributor = {
              id: value.id,
              consumer: consumer.name,
              distributor: distributor.name,
              product: product.name,
              points: value.points,
              valueOfPoints: value.valueOfPoints,
            };

            return temp;
          }
        )
      );

      return this.pointsWithConsumerProductAndDistributorData;
    },

    async fetchPointById(pointId: string) {
      const response = await fetch(`${BASE_URL}/points/${pointId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as PointObject;
    },
  },
});
