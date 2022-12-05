<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
    <MainCard>
      <!--    <AllConsumers />-->
      <SearchContainer
        :item-attributes="consumersStore.getConsumersAttributes"
        :records="consumersStore.getConsumers"
        :search-keys="['name', 'email', 'phone']"
      >
        <template #edit="{ recordId }">
          <GroupButton type="edit" @click="onEditClick(recordId)" />
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
      <ModalContainer
        :initial-focus="initialFocusElement"
        :show="editShow"
        dialog-title="Update Consumer"
      >
        <template #content>
          <ManageConsumerForm
            :consumer-id="consumerIdProp"
            @name-input="onNameInputHandler"
            @close-modal="onClose"
          />
        </template>
      </ModalContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainCard from "../components/cards/MainCard.vue";
// import AllConsumers from "../components/app/consumers/AllConsumers.vue";
import { useRoutingStore } from "../stores/routing";
import { useRoute, useRouter } from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";
import { Ref, ref } from "vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import CreateConsumerForm from "../components/app/consumers/CreateConsumerForm.vue";
import { useConsumersStore } from "../stores/consumers";
// import { useRequest } from "vue-request";
import SearchContainer from "../components/searching/SearchContainer.vue";
import GroupButton from "../components/buttons/GroupButton.vue";
import { ConsumerObject } from "../stores/consumers/interfaces";
import ManageConsumerForm from "../components/app/consumers/ManageConsumerForm.vue";

const consumersStore = useConsumersStore();

const routingStore = useRoutingStore();

const router = useRouter();

const consumers: Ref<ConsumerObject[] | undefined> = ref();

consumers.value = await consumersStore.fetchConsumers();

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

const onClose = async (value: boolean) => {
  show.value = value;
  editShow.value = value;
  consumers.value = await consumersStore.fetchConsumers();
  router.go(0);
};

const editShow = ref(false);

const consumerIdProp = ref("");

const onEditClick = (consumerId: string) => {
  editShow.value = !editShow.value;
  consumerIdProp.value = consumerId;
};
</script>

<style scoped></style>
