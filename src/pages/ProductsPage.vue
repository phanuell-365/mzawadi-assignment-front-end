<template>
  <SidebarLayout>
    <template #navProps>
      <SidebarContainer />
    </template>
    <template #pages>
      <div>
        <CardHeading @add-click="onAddClickHandler" />
      </div>
      <!-- Main heading for products -->
      <MainCard>
        <SearchContainer
          :item-attributes="productsStore.getProductsAttributes"
          :records="products"
          :search-keys="['name', 'price']"
        >
          <template #edit="{ recordId }">
            <GroupButton type="view" @click="onEditClick(recordId)" />
          </template>
        </SearchContainer>
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
        <ModalContainer
          :initial-focus="initialFocusElement"
          :show="editShow"
          dialog-title="Update Product"
        >
          <template #content>
            <ManageProductForm
              :product-id="productIdProp"
              @close-modal="onClose"
              @name-input="onNameInputHandler"
            />
          </template>
        </ModalContainer>
      </div>
    </template>
  </SidebarLayout>
</template>

<script lang="ts" setup>
import { useRoutingStore } from "../stores/routing";
import { useRoute, useRouter } from "vue-router";
import { ref, Ref } from "vue";
import CardHeading from "../components/cards/CardHeading.vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import CreateProductForm from "../components/app/products/CreateProductForm.vue";
import { useProductsStore } from "../stores/products";
import GroupButton from "../components/buttons/GroupButton.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import MainCard from "../components/cards/MainCard.vue";
import ManageProductForm from "../components/app/products/ManageProductForm.vue";
import { ProductObject } from "../stores/products/interfaces";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";
import SidebarLayout from "../layouts/SidebarLayout.vue";

const productsStore = useProductsStore();

const routingStore = useRoutingStore();

const route = useRoute();

const router = useRouter();

const products: Ref<ProductObject[] | undefined> = ref();

try {
  products.value = await productsStore.fetchProducts();
} catch (error: any) {
  if (error.statusCode === 401) {
    router.push("/login");
  }
}

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

const onClose = async (value: boolean) => {
  show.value = value;

  try {
    products.value = await productsStore.fetchProducts();
  } catch (error: any) {
    if (error.statusCode === 401) {
      await router.push("/login");
    }
  }
  router.go(0);
};

const editShow = ref(false);

const productIdProp = ref("");

const onEditClick = (productId: string) => {
  editShow.value = !editShow.value;
  productIdProp.value = productId;
};
</script>

<style scoped></style>
