<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <!-- Main card for targets -->
  <MainCard>
    <template v-if="!targetsIsLoading">
      <SearchContainer
        :item-attributes="
          targetsStore.getTargetsAttributesWithDistributorAndProduct
        "
        :records="targets"
        :search-keys="['product', 'distributor']"
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
      dialog-title="Set target for a Distributor"
    >
      <template #content>
        <CreateTargetForm
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
import { ref, Ref } from "vue";
import CreateTargetForm from "../components/app/targets/CreateTargetForm.vue";
import MainCard from "../components/cards/MainCard.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import GroupButton from "../components/buttons/GroupButton.vue";
import { useRequest } from "vue-request";
import { useTargetsStore } from "../stores/targets";

const targetsStore = useTargetsStore();

const { data: targets, loading: targetsIsLoading } = useRequest(
  targetsStore.fetchTargetWithDistributorAndProduct(),
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
  console.log("the value received", value);
  show.value = value;
};
</script>

<style scoped></style>
