<template>
  <div class="header">
    <router-link to="/">
      <img src="../../assets/imgs/logo.png" />
    </router-link>
    <div class="icons">
      <router-link to="/cart">
        <p class="bag">
          <BIconBag />
          <span>{{ totalAmount }}</span>
        </p>
      </router-link>
      <router-link to="/auth" v-if="!isAuthenticated">
        <BIconPersonFill />
      </router-link>
      <a v-else @click="logout">
        <BIconBoxArrowRight />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  BIconPersonFill,
  BIconBag,
  BIconBoxArrowRight,
} from "bootstrap-icons-vue";
import { useCart } from "../../store/Cart";
import { useAuth } from "../../store/Auth";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    BIconPersonFill,
    BIconBag,
    BIconBoxArrowRight,
  },
  setup() {
    const cartStore = useCart();
    const authStore = useAuth();
    const router = useRouter()
    const totalAmount = computed(function () {
      return cartStore.totalAmount;
    });

    const isAuthenticated = computed(function () {
      return authStore.isAuthenticated;
    });

    function logout() {
      authStore.logout();
      router.replace("/");
    }

    return { totalAmount, isAuthenticated, logout };
  },
});
</script>

<style scoped lang="scss">
.header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding: 0 40px;
  box-shadow: 0 4px 5px rgba(48, 48, 48, 0.2);
  img {
    width: 7rem;
  }
  .icons {
    display: flex;
    align-items: center;
    & a {
      color: #8e2de2;
      font-size: 2rem;
      cursor: pointer;
    }
    & a:first-child {
      margin-right: 10px;
    }

    .bag {
      position: relative;
    }
    span {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #8e2de2;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      bottom: 0;
      left: 0;
      font-size: 1rem;
      font-weight: 400;
    }
  }
}
</style>
