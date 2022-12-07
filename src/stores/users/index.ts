import { defineStore } from "pinia";
import { BASE_URL } from "../constants/base-url";
import { CreateUser, UpdateUser, UserObject } from "./interfaces";
import { useTokenStore } from "../auth/token";

interface UsersStoreState {
  users: UserObject[];
}

export const useUsersStore = defineStore({
  id: "usersStore",
  state: (): UsersStoreState => ({
    users: [],
  }),
  getters: {
    getUsersAttributes: () => ["id", "name", "email", "phone", "role"],
  },
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return "Bearer " + tokenStore.getStoredToken();
    },
    async fetchUsers() {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.users = data as UserObject[];

      return this.users;
    },

    async fetchUserById(userId: string) {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as UserObject;
    },

    async createUser(userPayload: CreateUser) {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(userPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as UserObject;
    },

    async updateUser(updateUserPayload: UpdateUser, userId: string) {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(updateUserPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as UserObject;
    },

    async deleteUser(userId: string) {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
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
