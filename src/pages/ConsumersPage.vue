<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <MainCard>
    <!--    <AllConsumers />-->
    <SearchContainer
      v-if="!consumersIsLoading"
      :item-attributes="consumersStore.getConsumersAttributes"
      :records="consumers"
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
      dialog-title="Create Consumer"
    >
      <template #content>
        <CreateConsumerForm
          @close-modal="onClose"
          @name-input="onNameInputHandler"
        />
      </template>
    </ModalContainer>
  </div>
</template>

<script lang="ts" setup>
import MainCard from "../components/cards/MainCard.vue";
// import AllConsumers from "../components/app/consumers/AllConsumers.vue";
import { useRoutingStore } from "../stores/routing";
import { useRoute } from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";
import { Ref, ref } from "vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import CreateConsumerForm from "../components/app/consumers/CreateConsumerForm.vue";
import { useConsumersStore } from "../stores/consumers";
import { useRequest } from "vue-request";
import SearchContainer from "../components/searching/SearchContainer.vue";
import GroupButton from "../components/buttons/GroupButton.vue";

const consumersStore = useConsumersStore();

const { data: consumers, loading: consumersIsLoading } = useRequest(
  consumersStore.fetchConsumers(),
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
