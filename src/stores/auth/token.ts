import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTokenStore = defineStore({
  id: "tokenStore",
  state: () => ({
    token: null,
  }),
  getters: {},
  actions: {
    storeTokenToLocalStorage(token: string) {
      if (this.getStoredToken()) {
        localStorage.removeItem("token");
      }

      useStorage("token", token);
    },

    getStoredToken(): string {
      const data = localStorage.getItem("token");
      if (!data) {
        return "";
      }

      return data;
    },
  },
});
