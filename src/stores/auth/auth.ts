import { defineStore } from "pinia";
import { BASE_URL } from "../constants/base-url";
import { UserLogin } from "./interfaces";
import { useTokenStore } from "./token";
import { useStorage } from "@vueuse/core";

interface AuthState {
  token: string;
  accessToken: string;
  expiresIn: string;
  role: string;
  userId: string;
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: (): AuthState => ({
    accessToken: "",
    expiresIn: "",
    role: "",
    token: "",
    userId: "",
  }),
  getters: {},
  actions: {
    async login(userLogin: UserLogin) {
      const response = await fetch(`${BASE_URL}/auth/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      const tokenStore = useTokenStore();

      const { access_token, expires_in, userId, role } = data;

      this.token = access_token;
      this.expiresIn = expires_in;
      this.userId = userId;
      this.role = role;

      const expiresInHours = Number.parseInt(expires_in);
      const expiresIn = expiresInHours * 60 * 60 * 1000;
      const expiryDate = new Date().getTime() + expiresIn;

      tokenStore.storeTokenToLocalStorage(access_token);

      const dataToStore = JSON.stringify({ ...data, expiryDate });

      useStorage("authentication", dataToStore);
    },

    isAuthenticated() {
      const tokenStore = useTokenStore();

      return !!tokenStore.getStoredToken();
    },
    getLoggedInUserId(): string | undefined {
      const data = localStorage.getItem("authentication");

      if (data) {
        const authData = JSON.parse(data);
        return authData.userId;
      }
      return undefined;
    },
    getUserRole(): string | undefined {
      const data = localStorage.getItem("authentication");

      if (data) {
        const authData = JSON.parse(data);
        return authData.role;
      }
      return undefined;
    },
    isAdmin() {
      return this.getUserRole() === "admin";
    },
    isLoggedIn() {
      return this.isAuthenticated();
    },
    logout() {
      localStorage.removeItem("authentication");
      localStorage.removeItem("token");
    },
  },
});
