<template>
  <TransitionRoot :show="show" as="template">
    <Dialog
      :initial-focus="initialFocusElement"
      class="relative z-50"
      static
      @close="() => null"
    >
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!--   Backdrop     -->
        <div
          aria-hidden="true"
          class="fixed inset-0 bg-black/30 backdrop-blur-sm"
        />
      </TransitionChild>

      <TransitionChild
        enter="duration-100 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-80 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            class="w-full md:w-1/3 rounded-lg shadow-lg dark:shadow-xl bg-white dark:bg-zinc-700 px-7 py-5 m-5"
          >
            <DialogTitle
              class="my-3 text-2xl font-bold text-stone-700 dark:text-stone-50"
            >
              Log in to your account
            </DialogTitle>
            <div class="py-2 m-3">
              <form autocomplete="off" novalidate @submit.prevent>
                <div class="md:flex flex-col flex-wrap mx-3">
                  <label>
                    <span
                      class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-stone-700 dark:text-stone-50 py-3"
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
                      class="peer block bg-white dark:bg-zinc-600 w-full border rounded-full py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
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
                      class="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-stone-700 dark:text-stone-50 py-3"
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
                      class="peer block bg-white dark:bg-zinc-600 w-full border rounded-full py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
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
                <div class="py-3 flex justify-end">
                  <button
                    class="py-1 px-4 m-2 rounded-full bg-sky-400 focus:ring focus:ring-sky-200 active:ring-sky-300 hover:bg-sky-600 hover:text-white focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
                    @click="onLoginClick(false)"
                  >
                    Login
                  </button>
                  <button
                    class="py-1 px-4 m-2 rounded-full border border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 focus:ring focus:ring-red-300 dark:focus:ring-red-500 active:ring-red-300 dark:active:ring-red-400 hover:text-white dark:hover:text-stone-50 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
                    @click="onCancelClick(false)"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useField } from "vee-validate";
import { useTokenStore } from "../../../stores/auth/token";
import { UserLogin } from "../../../stores/auth/interfaces";
import { useAuthStore } from "../../../stores/auth/auth";

const tokenStore = useTokenStore();
const authStore = useAuthStore();

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
      show.value = value;
    } catch (error: any) {
      invalidCredentialsMessage.value = error.message;
      invalidCredentials.value = true;
      console.error(error);
    }
  }
};

const onCancelClick = (value: boolean) => {
  show.value = value;
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
