<script lang="ts">
import TheNavbar from "./components/layout/TheNavbar.vue";
import { defineComponent } from "vue";
import { useAuth } from "./store/Auth";
import { useProducts } from "./store/Products";
export default defineComponent({
  components: {
    TheNavbar,
  },
  setup() {
    const store = useProducts();
    const authStore = useAuth();
    authStore.tryLogin();
    store.loadCategories();
    store.loadProducts();
  },
});
</script>
<template>
  <the-navbar />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
