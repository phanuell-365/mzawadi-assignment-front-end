<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <MainCard>
    <SearchContainer
      :item-attributes="
        salesStore.getSalesAttributesWithConsumerDistributorAndProduct
      "
      :records="sales"
      :search-keys="['consumer', 'product', 'distributor']"
    >
      <template #edit="{ recordId }">
        <GroupButton type="edit" @click="onViewClick(recordId)" />
      </template>
    </SearchContainer>
  </MainCard>
  <div>
    <ModalContainer
      :initial-focus="initialFocusElement"
      :show="show"
      dialog-title="Create User"
    >
      <template #content>
        <CreateSaleForm
          @close-modal="onClose"
          @name-input="onNameInputHandler"
        />
      </template>
    </ModalContainer>
    <ModalContainer
      :initial-focus="initialFocusElement"
      :show="viewShow"
      dialog-title="View a sale"
    >
      <template #content>
        <ManageSaleForm
          :sale-id="saleIdProp"
          @name-input="onNameInputHandler"
          @close-modal="onClose"
        />
      </template>
    </ModalContainer>
  </div>
</template>

<script lang="ts" setup>
import { useRoutingStore } from "../stores/routing";
import { useRoute } from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import CreateSaleForm from "../components/app/sales/CreateSaleForm.vue";
import { ref, Ref } from "vue";
import MainCard from "../components/cards/MainCard.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import { useSalesStore } from "../stores/sales";
import GroupButton from "../components/buttons/GroupButton.vue";
import { SaleObjectWithConsumerDistributorAndProduct } from "../stores/sales/interfaces";
import ManageSaleForm from "../components/app/sales/ManageSaleForm.vue";

const routingStore = useRoutingStore();

const salesStore = useSalesStore();

const sales: Ref<SaleObjectWithConsumerDistributorAndProduct[] | undefined> =
  ref();

sales.value = await salesStore.fetchSaleWithConsumerAndDistributor();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);

const show: Ref<boolean> = ref(false);

const onAddClickHandler = () => {
  show.value = !show.value;
};

const initialFocusElement: Ref<HTMLInputElement | null> = ref(null);

const onNameInputHandler = (input: HTMLInputElement) => {
  initialFocusElement.value = input;
};

const onClose = async (value: boolean) => {
  show.value = value;
  viewShow.value = value;
  sales.value = await salesStore.fetchSaleWithConsumerAndDistributor();
};

const viewShow = ref(false);

const saleIdProp = ref("");

const onViewClick = (saleId: string) => {
  viewShow.value = !viewShow.value;
  saleIdProp.value = saleId;
};
</script>

<style scoped></style>
