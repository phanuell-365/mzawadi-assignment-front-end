<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <MainCard>
    <template v-if="!salesIsLoading">
      <SearchContainer
        :item-attributes="
          salesStore.getSalesAttributesWithConsumerDistributorAndProduct
        "
        :records="sales"
        :search-keys="['consumer', 'product', 'distributor']"
      >
        <template #edit>
          <GroupButton type="edit" />
        </template>
      </SearchContainer>
    </template>
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
import { useRequest } from "vue-request";
import GroupButton from "../components/buttons/GroupButton.vue";

const routingStore = useRoutingStore();

const salesStore = useSalesStore();

const { data: sales, loading: salesIsLoading } = useRequest(
  salesStore.fetchSaleWithConsumerAndDistributor(),
  {
    refreshOnWindowFocus: true,
    pollingInterval: 60000,
  }
);

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

const onClose = (value: boolean) => {
  show.value = value;
};
</script>

<style scoped></style>
