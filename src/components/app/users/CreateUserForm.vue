<template>
  <form autocomplete="off" novalidate @submit.prevent>
    <div class="md:flex flex-row flex-wrap mx-3">
      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Name</span
        >
        <input
          id="name"
          ref="nameInputRef"
          v-model="username"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600':
              (!usernameMeta.valid && usernameMeta.validated) ||
              (!usernameMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!usernameMeta.valid && usernameMeta.validated) ||
                (!usernameMeta.validated && !formIsValid)
              ),
          }"
          autocomplete="off"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="name"
          required
          type="text"
        />
        <small
          v-if="!usernameMeta.valid && usernameMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ usernameErrorMessage }}
        </small>
        <small
          v-else-if="!usernameMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Phone</span
        >
        <input
          id="phone"
          v-model="phone"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!phoneMeta.valid && phoneMeta.validated) ||
              (!phoneMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!phoneMeta.valid && phoneMeta.validated) ||
                (!phoneMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="phone"
          required
          type="tel"
        />
        <small
          v-if="!phoneMeta.valid && phoneMeta.validated"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ phoneErrorMessage }}
        </small>
        <small
          v-else-if="!phoneMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>

      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Email</span
        >
        <input
          id="email"
          v-model="email"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!emailMeta.valid && emailMeta.validated) ||
              (!emailMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!emailMeta.valid && emailMeta.validated) ||
                (!emailMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="email"
          required
          type="email"
        />
        <small
          v-if="!emailMeta.valid && emailMeta.validated"
          class="mt-2 peer-required:visible block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ emailErrorMessage }}
        </small>
        <small
          v-else-if="!emailMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>
      <label class="inline-block basis-1/2 p-3">
        <span
          class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-stone-700 dark:text-stone-50 pb-2"
          >Password</span
        >
        <input
          id="password"
          v-model="password"
          :class="{
            'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
              (!passwordMeta.valid && passwordMeta.validated) ||
              (!passwordMeta.validated && !formIsValid),
            'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
              !(
                (!passwordMeta.valid && passwordMeta.validated) ||
                (!passwordMeta.validated && !formIsValid)
              ),
          }"
          class="peer block bg-white dark:bg-zinc-600 w-full border rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          name="password"
          required
          type="password"
        />
        <small
          v-if="!passwordMeta.valid && passwordMeta.validated"
          class="mt-2 peer-required:visible block text-pink-600 dark:text-pink-500 text-sm"
        >
          {{ passwordErrorMessage }}
        </small>
        <small
          v-else-if="!passwordMeta.validated && !formIsValid"
          class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
        >
          This is a required field
        </small>
      </label>
    </div>

    <div class="py-3 flex justify-end">
      <button
        class="py-1 px-4 m-2 rounded-full border border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 focus:ring focus:ring-red-300 dark:focus:ring-red-500 active:ring-red-300 dark:active:ring-red-400 hover:text-white dark:hover:text-stone-50 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
        @click="onCancelClick(false)"
      >
        Cancel
      </button>
      <button
        class="py-1 px-4 m-2 rounded-full bg-sky-400 focus:ring focus:ring-sky-200 active:ring-sky-300 hover:bg-sky-600 hover:text-white focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
        @click="onCreateClick(false)"
      >
        Create
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { onMounted, ref, Ref } from "vue";
import { CreateUser } from "../../../stores/users/interfaces";
import { useUsersStore } from "../../../stores/users";

const usersStore = useUsersStore();

const usernameValidation = (value: string) => {
  if (!value) return "This is a required field!";

  return true;
};

const {
  value: username,
  errorMessage: usernameErrorMessage,
  meta: usernameMeta,
} = useField("name", usernameValidation);

const emailValidation = (value: string) => {
  if (!value) return "This is a required field!";

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  )
    return "Please enter a valid email!";

  if (!value.includes("@")) return "The email must have a '@'!";

  return true;
};

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta,
} = useField("email", emailValidation);

const phoneValidation = (value: string) => {
  if (!value) return "This is a required field!";

  if (!/^\d+$/.test(value)) {
    return "The phone number should contain only numbers!";
  }

  if (value.length < 10)
    return "The phone number should contain numbers not less than 10!";

  if (value.length > 10)
    return "The phone number should contain numbers not more than 10!";

  return true;
};

const {
  value: phone,
  errorMessage: phoneErrorMessage,
  meta: phoneMeta,
} = useField("phone", phoneValidation);

const passwordValidation = (value: string) => {
  if (!value) return "This is a required field!";

  if (value.length < 8)
    return "The password must contain more than 8 characters";
  return true;
};

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField("password", passwordValidation);

const emits = defineEmits<{
  (e: "name-input", input: HTMLElement | null): void;
  (e: "close-modal", value: boolean): void;
}>();

const nameInputRef: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
  emits("name-input", nameInputRef.value);
});

const formIsValid: Ref<boolean> = ref(true);

const onCancelClick = (value: boolean) => {
  emits("close-modal", value);
};

const validateForm = () => {
  formIsValid.value =
    usernameMeta.valid &&
    emailMeta.valid &&
    phoneMeta.valid &&
    passwordMeta.valid;
};

const createUserPayload = () => {
  const payload: CreateUser = {
    username: username.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
  };

  return payload;
};

const onCreateClick = (value: boolean) => {
  validateForm();
  if (formIsValid.value) {
    emits("close-modal", value);
    usersStore.createUser({ ...createUserPayload() });
  }
};
</script>

<style scoped></style>
