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

      return "Bearer " + tokenStore.getStoredToken();
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

      this.pointsWithConsumerProductAndDistributorDataId = await Promise.all(
        this.points.map(async (value) => {
          return await this.constructPointsWithConsumerAndDistributorDataId(
            value
          );
        })
      );

      return this.pointsWithConsumerProductAndDistributorDataId;
    },

    async constructPointsWithConsumerAndDistributorDataId(
      pointObject: PointObject
    ) {
      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      const productsStore = useProductsStore();

      const salesStore = useSalesStore();

      const sale = await salesStore.fetchSaleById(pointObject.SaleId);

      const distributor = await distributorsStore.fetchDistributorById(
        sale.DistributorId
      );

      const consumer = await consumersStore.fetchConsumerById(sale.ConsumerId);

      const product = await productsStore.fetchProductById(sale.ProductId);

      const temp: PointObjectWithConsumerProductAndDistributorId = {
        id: pointObject.id,
        ConsumerId: consumer.id,
        DistributorId: distributor.id,
        ProductId: product.id,
        points: pointObject.points,
        valueOfPoints: pointObject.valueOfPoints,
      };

      return temp;
    },

    async constructPointWithConsumerAndDistributorData(
      pointObjectWithConsumerProductAndDistributorId: PointObjectWithConsumerProductAndDistributorId
    ) {
      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      const productsStore = useProductsStore();

      const distributor = await distributorsStore.fetchDistributorById(
        pointObjectWithConsumerProductAndDistributorId.DistributorId
      );

      const consumer = await consumersStore.fetchConsumerById(
        pointObjectWithConsumerProductAndDistributorId.ConsumerId
      );

      const product = await productsStore.fetchProductById(
        pointObjectWithConsumerProductAndDistributorId.ProductId
      );

      const temp: PointObjectWithConsumerProductAndDistributor = {
        id: pointObjectWithConsumerProductAndDistributorId.id,
        consumer: consumer.name,
        distributor: distributor.name,
        product: product.name,
        points: pointObjectWithConsumerProductAndDistributorId.points,
        valueOfPoints:
          pointObjectWithConsumerProductAndDistributorId.valueOfPoints,
      };

      return temp;
    },

    async fetchPointWithConsumerAndDistributorDataById(pointId: string) {
      return await this.constructPointWithConsumerAndDistributorData(
        await this.constructPointsWithConsumerAndDistributorDataId(
          await this.fetchPointById(pointId)
        )
      );
    },

    async fetchPointsWithConsumerAndDistributorData() {
      await this.fetchPointsWithConsumerAndDistributorDataId();

      this.pointsWithConsumerProductAndDistributorData = await Promise.all(
        this.pointsWithConsumerProductAndDistributorDataId.map(
          async (value) => {
            return await this.constructPointWithConsumerAndDistributorData(
              value
            );
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
