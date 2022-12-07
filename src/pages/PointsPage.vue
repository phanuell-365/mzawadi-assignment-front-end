<template>
  <SidebarLayout>
    <template #navProps>
      <SidebarContainer />
    </template>
    <template #pages>
      <!-- Include the card heading -->
      <CardHeading />
      <!-- Include the main card -->
      <MainCard>
        <!-- Include the search container -->
        <SearchContainer
          :item-attributes="
            pointsStore.getPointsAttributesWithConsumerProductAndDistributor
          "
          :records="points"
          :search-keys="['consumer', 'product', 'distributor']"
        >
          <!-- Include the group button -->
          <template #edit="{ recordId }">
            <GroupButton type="view" @click="onViewClick(recordId)" />
          </template>
        </SearchContainer>
        <!-- Include the table -->
      </MainCard>
      <div>
        <ModalContainer
          :initial-focus="initialFocusElement"
          :show="viewShow"
          dialog-title="View points"
        >
          <template #content>
            <ViewPointForm
              :point-id="pointIdProp"
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
import CardHeading from "../components/cards/CardHeading.vue";
import { usePointsStore } from "../stores/points";
import SearchContainer from "../components/searching/SearchContainer.vue";
import MainCard from "../components/cards/MainCard.vue";
import GroupButton from "../components/buttons/GroupButton.vue";
import { ref, Ref } from "vue";
import { PointObjectWithConsumerProductAndDistributor } from "../stores/points/interfaces";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import ViewPointForm from "../components/app/points/ViewPointForm.vue";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";

const router = useRouter();

const pointsStore = usePointsStore();

const points: Ref<PointObjectWithConsumerProductAndDistributor[] | undefined> =
  ref();

try {
  points.value = await pointsStore.fetchPointsWithConsumerAndDistributorData();
} catch (error: any) {
  if (error.statusCode === 401) {
    router.push("/login");
  }
}

const initialFocusElement: Ref<HTMLInputElement | null> = ref(null);

const onNameInputHandler = (input: HTMLInputElement) => {
  initialFocusElement.value = input;
};

const onClose = async (value: boolean) => {
  viewShow.value = value;
  points.value = await pointsStore.fetchPointsWithConsumerAndDistributorData();
};

const viewShow = ref(false);

const pointIdProp = ref("");

const onViewClick = (pointId: string) => {
  viewShow.value = !viewShow.value;
  pointIdProp.value = pointId;
};

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);
</script>

<style scoped></style>
