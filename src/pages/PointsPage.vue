<template>
  <!-- Include the card heading -->
  <CardHeading />
  <!-- Include the main card -->
  <MainCard>
    <!-- Include the search container -->
    <SearchContainer
      v-if="!pointsIsLoading"
      :item-attributes="
        pointsStore.getPointsAttributesWithConsumerProductAndDistributor
      "
      :records="points"
      :search-keys="['consumer', 'product', 'distributor']"
    >
      <!-- Include the group button -->
      <template #edit>
        <GroupButton type="view" />
      </template>
    </SearchContainer>
    <!-- Include the table -->
  </MainCard>
</template>

<script lang="ts" setup>
import { useRoutingStore } from "../stores/routing";
import { useRoute } from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";
import { usePointsStore } from "../stores/points";
import { useRequest } from "vue-request";
import SearchContainer from "../components/searching/SearchContainer.vue";
import MainCard from "../components/cards/MainCard.vue";
import GroupButton from "../components/buttons/GroupButton.vue";

const pointsStore = usePointsStore();

const { data: points, loading: pointsIsLoading } = useRequest(
  pointsStore.fetchPointsWithConsumerAndDistributorData(),
  {
    refreshOnWindowFocus: true,
    pollingInterval: 60000,
  }
);

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);
</script>

<style scoped></style>
