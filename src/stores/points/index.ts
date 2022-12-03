import { defineStore } from "pinia";
import {
  PointObject,
  PointObjectWithConsumerAndDistributor,
  PointObjectWithConsumerAndDistributorId,
} from "./interfaces";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { useDistributorsStore } from "../distributors";
import { useConsumersStore } from "../consumers";
import { useSalesStore } from "../sales";

interface PointsStateStore {
  points: PointObject[];
  pointsWithConsumerAndDistributorDataId: PointObjectWithConsumerAndDistributorId[];
  pointsWithConsumerAndDistributorData: PointObjectWithConsumerAndDistributor[];
}

export const usePointsStore = defineStore({
  id: "pointsStore",
  state: (): PointsStateStore => ({
    points: [],
    pointsWithConsumerAndDistributorData: [],
    pointsWithConsumerAndDistributorDataId: [],
  }),
  getters: {},
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

      const salesStore = useSalesStore();

      this.pointsWithConsumerAndDistributorDataId = await Promise.all(
        this.points.map(async (value) => {
          const sale = await salesStore.fetchSaleById(value.SaleId);

          const distributor = await distributorsStore.fetchDistributorById(
            sale.DistributorId
          );

          const consumer = await consumersStore.fetchConsumerById(
            sale.ConsumerId
          );

          return {
            id: value.id,
            DistributorId: distributor.id,
            ConsumerId: consumer.id,
            points: value.points,
            valueOfPoints: value.valueOfPoints,
          } as PointObjectWithConsumerAndDistributorId;
        })
      );

      return this.pointsWithConsumerAndDistributorDataId;
    },

    async fetchPointsWithConsumerAndDistributorData() {
      await this.fetchPointsWithConsumerAndDistributorDataId();

      const distributorsStore = useDistributorsStore();

      const consumersStore = useConsumersStore();

      this.pointsWithConsumerAndDistributorData = await Promise.all(
        this.pointsWithConsumerAndDistributorDataId.map(async (value) => {
          const distributor = await distributorsStore.fetchDistributorById(
            value.DistributorId
          );

          const consumer = await consumersStore.fetchConsumerById(
            value.ConsumerId
          );

          return {
            id: value.id,
            distributor: distributor.name,
            consumer: consumer.name,
            points: value.points,
            valueOfPoints: value.valueOfPoints,
          } as PointObjectWithConsumerAndDistributor;
        })
      );

      return this.pointsWithConsumerAndDistributorData;
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
