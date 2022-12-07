<template>
  <SidebarLayout>
    <template #navProps>
      <SidebarContainer />
    </template>
    <template #pages>
      <div>
        <CardHeading @add-click="onAddClickHandler" />
      </div>
      <MainCard>
        <SearchContainer
          :item-attributes="distributorsStore.getDistributorAttributes"
          :records="distributors"
          :search-keys="['name', 'email', 'phone']"
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
          dialog-title="Create Distributor"
        >
          <template #content>
            <CreateDistributorForm
              @close-modal="onClose"
              @name-input="onNameInputHandler"
            />
          </template>
        </ModalContainer>
        <ModalContainer
          :initial-focus="initialFocusElement"
          :show="editShow"
          dialog-title="Update Distributor"
        >
          <template #content>
            <ManageDistributorForm
              :distributor-id="distributorIdProp"
              @name-input="onNameInputHandler"
              @close-modal="onClose"
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
import CreateDistributorForm from "../components/app/distributors/CreateDistributorForm.vue";
import MainCard from "../components/cards/MainCard.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import { useDistributorsStore } from "../stores/distributors";
import GroupButton from "../components/buttons/GroupButton.vue";
import ManageDistributorForm from "../components/app/distributors/ManageDistributorForm.vue";
import { DistributorObject } from "../stores/distributors/interfaces";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";

const distributorsStore = useDistributorsStore();

const routingStore = useRoutingStore();

const route = useRoute();

const router = useRouter();

const distributors: Ref<DistributorObject[] | undefined> = ref();

try {
  distributors.value = await distributorsStore.fetchDistributors();
} catch (error: any) {
  if (error.statusCode === 401) {
    router.push("/login");
  }
}

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

  try {
    distributors.value = await distributorsStore.fetchDistributors();
  } catch (error: any) {
    if (error.statusCode === 401) {
      await router.push("/login");
    }
  }
  router.go(0);
};

const editShow = ref(false);

const distributorIdProp = ref("");

const onEditClick = (distributorId: string) => {
  editShow.value = !editShow.value;
  distributorIdProp.value = distributorId;
};
</script>

<style scoped></style>
