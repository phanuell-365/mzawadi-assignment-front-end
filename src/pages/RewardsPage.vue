<template>
  <div>
    <CardHeading />
  </div>
  <!-- Main card for rewards with group button as view -->
  <MainCard>
    <template v-if="!rewardsIsLoading">
      <SearchContainer
        :item-attributes="
          rewardsStore.getRewardsAttributesWithConsumerAndProduct
        "
        :records="rewards"
        :search-keys="['product', 'distributor']"
      >
        <template #edit>
          <GroupButton type="view" />
        </template>
      </SearchContainer>
    </template>
  </MainCard>
</template>

<script lang="ts" setup>
import { useRoutingStore } from "../stores/routing";
import { useRoute } from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";

import { useRequest } from "vue-request";
import { useRewardsStore } from "../stores/rewards";
import SearchContainer from "../components/searching/SearchContainer.vue";
import MainCard from "../components/cards/MainCard.vue";
import GroupButton from "../components/buttons/GroupButton.vue";

const rewardsStore = useRewardsStore();

const { data: rewards, loading: rewardsIsLoading } = useRequest(
  rewardsStore.fetchRewardsWithProductAndDistributor(),
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
