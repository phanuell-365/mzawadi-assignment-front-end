import { defineStore } from "pinia";
import { useTokenStore } from "../auth/token";
import { BASE_URL } from "../constants/base-url";
import { CreateProduct, ProductObject, UpdateProduct } from "./interfaces";

interface ProductsStoreState {
  products: ProductObject[];
}

export const useProductsStore = defineStore({
  id: "productsStore",
  state: (): ProductsStoreState => ({
    products: [],
  }),
  getters: {},
  actions: {
    async getToken() {
      const tokenStore = useTokenStore();

      return tokenStore.getStoredToken();
    },
    async fetchProducts() {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      this.products = data as ProductObject[];

      return this.products;
    },

    async fetchProductById(productId: string) {
      const response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await this.getToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as ProductObject;
    },

    async createProduct(productPayload: CreateProduct) {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(productPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as ProductObject;
    },

    async updateProduct(
      updateProductPayload: UpdateProduct,
      productId: string
    ) {
      const response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: await this.getToken(),
        },
        body: JSON.stringify(updateProductPayload),
      });

      const data = await response.json();

      if (!response.ok) throw data as Error;

      return data as ProductObject;
    },
    async deleteProduct(productId: string) {
      const response = await fetch(`${BASE_URL}/products/${productId}`, {
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
