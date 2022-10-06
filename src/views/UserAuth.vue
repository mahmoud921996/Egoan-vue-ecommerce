<template>
  <div class="auth">
    <base-dialogue
      :show="!!error"
      title="An error occurred"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialogue>
    <base-dialogue :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialogue>
    <base-card>
      <form @submit.prevent="submit">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <div class="btns">
          <button>{{ submitButtonCaption }}</button>
          <button @click="switchAuth" type="button" class="flat">
            {{ switchModeButtonCaption }}
          </button>
        </div>
      </form>
    </base-card>
  </div>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, ref, computed } from "vue";
import { useAuth } from "../store/Auth";
export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref<string>("");
    const password = ref<string>("");
    const mode = ref("login");
    const error = ref<string | null>(null);
    const authStore = useAuth();
    const isLoading = ref<boolean>(false);
    const formIsValid = ref<boolean>(true);
    const submitButtonCaption = computed(function () {
      return mode.value === "login" ? "login" : "signup";
    });
    function switchAuth() {
      if (mode.value === "login") {
        mode.value = "signup";
      } else {
        mode.value = "login";
      }
    }
    const switchModeButtonCaption = computed(function () {
      return mode.value === "login" ? "signup instead" : "loign instead";
    });

    // send from Data to Auth
    async function submit() {
      formIsValid.value = true;
      if (
        email.value.trim() === "" ||
        !email.value.includes("@") ||
        password.value.length < 6
      ) {
        formIsValid.value = false;
        return;
      }
      isLoading.value = true;
      const actionPayload = {
        email: email.value,
        password: password.value,
      };
      try {
        if (mode.value === "login") {
          await authStore.login(actionPayload);
        } else {
          await authStore.signUp(actionPayload);
        }
        router.push("/");
      } catch (err: any) {
        error.value = err.message;
      }
      isLoading.value = false;
    }
    function handleError() {
      error.value = null;
    }
    return {
      password,
      email,
      submitButtonCaption,
      switchAuth,
      formIsValid,
      switchModeButtonCaption,
      submit,
      handleError,
      error,
      isLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth {
  margin: 1rem;
  form {
    margin: 1rem;
    padding: 1rem;
    .form-control {
      margin: 0.5rem 0;
      label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
      }
      input,
      textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
      }
      input:focus,
      textarea:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
      }
    }
    .btns {
      display: flex;
      align-items: center;
      button {
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        font: inherit;
        background-color: #3a0061;
        border: 1px solid #3a0061;
        color: white;
        cursor: pointer;
        border-radius: 30px;
        margin-right: 0.5rem;
        display: inline-block;
        &:hover,
        &:active {
          background-color: #270041;
          border-color: #270041;
        }
        &.flat {
          background-color: transparent;
          color: #3a0061;
          border: none;
          &:hover,
          &:active {
            background-color: #edd2ff;
          }
        }
      }
    }
  }
}
</style>
