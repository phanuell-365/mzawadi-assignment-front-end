<template>
  <div
    class="h-screen mx-auto flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-600"
  >
    <div class="title flex justify-center flex-col items-center">
      <h1 class="text-5xl font-bold text-stone-600 dark:text-stone-50">
        Welcome to Company X.
      </h1>
      <h1 class="my-5 text-3xl font-bold text-stone-500 dark:text-stone-50">
        Log in to your account
      </h1>
    </div>
    <div
      class="bg-white dark:bg-zinc-700 dark:shadow-zinc-700 py-3 px-5 mx-3 my-5 shadow-lg dark:shadow-xl rounded-xl w-1/3"
    >
      <form autocomplete="off" novalidate @submit.prevent>
        <div class="md:flex flex-col flex-wrap mx-3">
          <label>
            <span
              class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-sm text-stone-700 dark:text-stone-50 mt-5 pb-2"
              >Username</span
            >
            <input
              id="username"
              ref="initialFocusElement"
              v-model="username"
              :class="{
                'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
                  invalidCredentials ||
                  (!usernameMeta.valid && usernameMeta.validated) ||
                  (!usernameMeta.validated && !formIsValid),
                'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
                  !(
                    (!usernameMeta.valid && usernameMeta.validated) ||
                    (!usernameMeta.validated && !formIsValid)
                  ),
              }"
              class="peer block bg-white dark:bg-zinc-600 w-full border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
              name="username"
              type="text"
            />
            <small
              v-if="!usernameMeta.valid && usernameMeta.validated"
              class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
              >{{ usernameErrorMessage }}</small
            >
            <small
              v-else-if="!usernameMeta.validated && !formIsValid"
              class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >
              Please enter a username!
            </small>
            <small
              v-else-if="invalidCredentials"
              class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
              >{{ invalidCredentialsMessage }}</small
            >
          </label>

          <label>
            <span
              class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-sm text-stone-700 dark:text-stone-50 mt-5 pb-2"
              >Password</span
            >
            <input
              id="password"
              v-model="password"
              :class="{
                'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
                  invalidCredentials ||
                  (!passwordMeta.valid && passwordMeta.validated) ||
                  (!passwordMeta.validated && !formIsValid),
                'border-stone-300 dark:border-stone-50 focus:border-sky-500 dark:focus:border-sky-300 focus:ring-sky-500 dark:focus:ring-sky-200 dark:text-stone-50 caret-sky-200':
                  !(
                    (!passwordMeta.valid && passwordMeta.validated) ||
                    (!passwordMeta.validated && !formIsValid)
                  ),
              }"
              class="peer block bg-white dark:bg-zinc-600 w-full border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
              name="password"
              type="password"
            />
            <small
              v-if="!passwordMeta.valid && passwordMeta.validated"
              class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
              >{{ passwordErrorMessage }}</small
            >
            <small
              v-else-if="!passwordMeta.validated && !formIsValid"
              class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >
              Please enter a password!
            </small>
            <small
              v-else-if="invalidCredentials"
              class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
              >{{ invalidCredentialsMessage }}</small
            >
          </label>
        </div>
        <div class="py-3 mt-4 flex justify-end">
          <button
            class="py-1 px-4 m-2 rounded-lg bg-sky-400 focus:ring focus:ring-sky-200 active:ring-sky-300 hover:bg-sky-600 hover:text-white focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
            @click="onLoginClick(false)"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTokenStore } from "../stores/auth/token";
import { useAuthStore } from "../stores/auth/auth";
import { onBeforeMount, ref, Ref } from "vue";
import { useField } from "vee-validate";
import { UserLogin } from "../stores/auth/interfaces";
import { useRouter } from "vue-router";
import { useDark } from "@vueuse/core";

const isDark = useDark();

isDark.value = false;
const tokenStore = useTokenStore();
const authStore = useAuthStore();

const router = useRouter();

const show: Ref<boolean> = ref(false);

const usernameValidation = (value: string) => {
  if (!value) return "Please enter a username!";

  return true;
};

const {
  value: username,
  errorMessage: usernameErrorMessage,
  meta: usernameMeta,
} = useField("username", usernameValidation);

const passwordValidation = (value: string) => {
  if (!value) return "Please enter a password!";

  return true;
};

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField("password", passwordValidation);

const initialFocusElement: Ref<HTMLInputElement | null> = ref(null);

const formIsValid: Ref<boolean> = ref(true);

const validateForm = () => {
  formIsValid.value = usernameMeta.valid && passwordMeta.valid;
};

const createAuthPayload = () => {
  const payload: UserLogin = {
    username: username.value,
    password: password.value,
  };

  return payload;
};

const invalidCredentials = ref(false);
const invalidCredentialsMessage = ref("");

const onLoginClick = async (value: boolean) => {
  validateForm();

  if (formIsValid.value) {
    try {
      await authStore.login(createAuthPayload());
      await router.push("/dashboard");
    } catch (error: any) {
      invalidCredentialsMessage.value = error.message;
      invalidCredentials.value = true;
      console.error(error);
    }
  }
};
// check for a token on the local storage before mounting this component
// if there is a token, it means the user is authenticated, no need to show the login modal

onBeforeMount(() => {
  const token = tokenStore.getStoredToken();

  if (token.length <= 0) {
    show.value = true;
  }
});
</script>

<style scoped></style>
