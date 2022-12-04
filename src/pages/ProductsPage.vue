<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <!-- Main heading for products -->
  <MainCard>
    <template v-if="!productsIsLoading">
      <SearchContainer
        :item-attributes="productsStore.getProductsAttributes"
        :records="products"
        :search-keys="['name', 'price']"
      >
        <template #edit>
          <GroupButton type="view" />
        </template>
      </SearchContainer>
    </template>
  </MainCard>
  <div>
    <ModalContainer
      :initial-focus="initialFocusElement"
      :show="show"
      dialog-title="Create Product"
    >
      <template #content>
        <CreateProductForm
          @close-modal="onClose"
          @name-input="onNameInputHandler"
        />
      </template>
    </ModalContainer>
  </div>
</template>

<script lang="ts" setup>
import { useRoutingStore } from "../stores/routing";
import { useRoute } from "vue-router";
import { ref, Ref } from "vue";
import CardHeading from "../components/cards/CardHeading.vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import CreateProductForm from "../components/app/products/CreateProductForm.vue";
import { useProductsStore } from "../stores/products";
import { useRequest } from "vue-request";
import GroupButton from "../components/buttons/GroupButton.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import MainCard from "../components/cards/MainCard.vue";

const productsStore = useProductsStore();

const { data: products, loading: productsIsLoading } = useRequest(
  productsStore.fetchProducts(),
  {
    refreshOnWindowFocus: true,
    pollingInterval: 60000,
  }
);

const routingStore = useRoutingStore();

const route = useRoute();

const show: Ref<boolean> = ref(false);

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);

const onAddClickHandler = () => {
  show.value = !show.value;
};

const initialFocusElement: Ref<HTMLInputElement | null> = ref(null);

const onNameInputHandler = (input: HTMLInputElement) => {
  initialFocusElement.value = input;
};

const onClose = (value: boolean) => {
  console.log("the value received", value);
  show.value = value;
};
</script>

<style scoped></style>
