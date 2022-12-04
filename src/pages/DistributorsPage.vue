<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <MainCard>
    <SearchContainer
      v-if="!distributorsIsLoading"
      :item-attributes="distributorsStore.getDistributorAttributes"
      :records="distributors"
      :search-keys="['name', 'email']"
    >
      <template #edit>
        <GroupButton type="view" />
      </template>
    </SearchContainer>
  </MainCard>
  <div>
    <ModalContainer
      :initial-focus="initialFocusElement"
      :show="show"
      dialog-title="Create Distributor"
    >
      <template #content>
        <CreateDistributorForm
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
import CreateDistributorForm from "../components/app/distributors/CreateDistributorForm.vue";
import MainCard from "../components/cards/MainCard.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import { useRequest } from "vue-request";
import { useDistributorsStore } from "../stores/distributors";
import GroupButton from "../components/buttons/GroupButton.vue";

const distributorsStore = useDistributorsStore();

const { data: distributors, loading: distributorsIsLoading } = useRequest(
  distributorsStore.fetchDistributors(),
  {
    refreshOnWindowFocus: true,
    pollingInterval: 60000,
  }
);

const routingStore = useRoutingStore();

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
