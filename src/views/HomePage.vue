<template>
  <div class="home">
    <ProductsContainer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "../components/layout/SideBar.vue";
import ProductsContainer from "../components/products/ProductsContainer.vue";

export default defineComponent({
  components: {
    SideBar,
    ProductsContainer,
  },
});
</script>
