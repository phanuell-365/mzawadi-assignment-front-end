<template>
  <SidebarLayout>
    <template #navProps>
      <SidebarContainer />
    </template>
    <template #pages>
      <div>
        <CardHeading />
      </div>
      <!-- Main card for rewards with group button as view -->
      <MainCard>
        <SearchContainer
          :item-attributes="
            rewardsStore.getRewardsAttributesWithConsumerAndProduct
          "
          :records="rewards"
          :search-keys="['product', 'distributor']"
        >
          <template #edit="{ recordId }">
            <GroupButton type="view" @click="onViewClick(recordId)" />
          </template>
        </SearchContainer>
      </MainCard>
      <div>
        <ModalContainer
          :initial-focus="initialFocusElement"
          :show="viewShow"
          dialog-title="View Reward"
        >
          <template #content>
            <ViewRewardForm
              :reward-id="rewardIdProp"
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
import { useRewardsStore } from "../stores/rewards";
import SearchContainer from "../components/searching/SearchContainer.vue";
import MainCard from "../components/cards/MainCard.vue";
import GroupButton from "../components/buttons/GroupButton.vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import ViewRewardForm from "../components/app/rewards/ViewRewardForm.vue";
import { ref, Ref } from "vue";
import { RewardObjectWithConsumerAndProduct } from "../stores/rewards/interfaces";
import SidebarLayout from "../layouts/SidebarLayout.vue";
import SidebarContainer from "../components/sidebar/SidebarContainer.vue";

const rewardsStore = useRewardsStore();

const router = useRouter();

const rewards: Ref<RewardObjectWithConsumerAndProduct[] | undefined> = ref();

try {
  rewards.value = await rewardsStore.fetchRewardsWithProductAndDistributor();
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
  try {
    rewards.value = await rewardsStore.fetchRewardsWithProductAndDistributor();
  } catch (error: any) {
    if (error.statusCode === 401) {
      await router.push("/login");
    }
  }
};

const viewShow = ref(false);

const rewardIdProp = ref("");

const onViewClick = (rewardId: string) => {
  viewShow.value = !viewShow.value;
  rewardIdProp.value = rewardId;
};

const routingStore = useRoutingStore();

const route = useRoute();

// set the current route name in the routing store
routingStore.setCurrentRoute(route?.name as string);
</script>

<style scoped></style>
