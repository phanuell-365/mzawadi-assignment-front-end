<template>
  <SidebarLayout>
    <template #navProps>
      <SidebarContainer />
    </template>
    <template #pages>
      <div>
        <CardHeading @add-click="onAddClickHandler" />
      </div>
      <!-- Main card for targets -->
      <MainCard>
        <SearchContainer
          :item-attributes="
            targetsStore.getTargetsAttributesWithDistributorAndProduct
          "
          :records="targets"
          :search-keys="['product', 'distributor']"
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
          dialog-title="Set target for a Distributor"
        >
          <template #content>
            <CreateTargetForm
              @close-modal="onClose"
              @name-input="onNameInputHandler"
            />
          </template>
        </ModalContainer>
        <ModalContainer
          :initial-focus="initialFocusElement"
          :show="editShow"
          dialog-title="Manage a Target"
        >
          <template #content>
            <ManageTargetForm
              :target-id="targetIdProp"
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
import CardHeading from "../components/cards/CardHeading.vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import { ref, Ref } from "vue";
import CreateTargetForm from "../components/app/targets/CreateTargetForm.vue";
import MainCard from "../components/cards/MainCard.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import GroupButton from "../components/buttons/GroupButton.vue";
import { useTargetsStore } from "../stores/targets";
import ManageTargetForm from "../components/app/targets/ManageTargetForm.vue";
import { TargetObjectWithDistributorAndProduct } from "../stores/targets/interfaces";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";

const targetsStore = useTargetsStore();

const router = useRouter();

const targets: Ref<TargetObjectWithDistributorAndProduct[] | undefined> = ref();

try {
  targets.value = await targetsStore.fetchTargetWithDistributorAndProduct();
} catch (error: any) {
  if (error.statusCode === 401) {
    router.push("/login");
  }
}

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

const onClose = async (value: boolean) => {
  console.log("the value received", value);
  show.value = value;

  try {
    targets.value = await targetsStore.fetchTargetWithDistributorAndProduct();
  } catch (error: any) {
    if (error.statusCode === 401) {
      await router.push("/login");
    }
  }
  router.go(0);
};

const editShow = ref(false);

const targetIdProp = ref("");

const onEditClick = (targetId: string) => {
  editShow.value = !editShow.value;
  targetIdProp.value = targetId;
};
</script>

<style scoped></style>
