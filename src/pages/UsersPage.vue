<template>
  <div>
    <CardHeading @add-click="onAddClickHandler" />
  </div>
  <!-- Main card for user with group button as edit -->
  <MainCard>
    <SearchContainer
      :item-attributes="usersStore.getUsersAttributes"
      :records="users"
      :search-keys="['name', 'email', 'role']"
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
      dialog-title="Create User"
    >
      <template #content>
        <CreateUserForm
          @close-modal="onClose"
          @name-input="onNameInputHandler"
        />
      </template>
    </ModalContainer>
    <ModalContainer
      :initial-focus="initialFocusElement"
      :show="editShow"
      dialog-title="Update user"
    >
      <template #content>
        <ManageUserForm
          :user-id="userIdProp"
          @close-modal="onClose"
          @name-input="onNameInputHandler"
        />
      </template>
    </ModalContainer>
  </div>
</template>

<script lang="ts" setup>
import { useRoutingStore } from "../stores/routing";
import { useRoute, useRouter } from "vue-router";
import CardHeading from "../components/cards/CardHeading.vue";
import ModalContainer from "../components/modals/create/ModalContainer.vue";
import CreateUserForm from "../components/app/users/CreateUserForm.vue";
import { ref, Ref } from "vue";
import MainCard from "../components/cards/MainCard.vue";
import SearchContainer from "../components/searching/SearchContainer.vue";
import { useUsersStore } from "../stores/users";
import GroupButton from "../components/buttons/GroupButton.vue";
import ManageUserForm from "../components/app/users/ManageUserForm.vue";
import { UserObject } from "../stores/users/interfaces";

const router = useRouter();

const usersStore = useUsersStore();

const users: Ref<UserObject[] | undefined> = ref();

users.value = await usersStore.fetchUsers();

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

const editShow = ref(false);

const userIdProp = ref("");

const onClose = async (value: boolean) => {
  show.value = value;
  editShow.value = value;
  users.value = await usersStore.fetchUsers();
  router.go(0);
};

const onEditClick = (userId: string) => {
  editShow.value = !editShow.value;
  userIdProp.value = userId;
};
</script>

<style scoped></style>
