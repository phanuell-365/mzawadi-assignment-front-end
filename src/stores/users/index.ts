import { defineStore } from "pinia";
import { BASE_URL } from "../constants/base-url";

export const useUsersStore = defineStore({
  id: "usersStore",
  state: () => ({}),
  getters: {},
  actions: {
    async fetchUsers() {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
});
