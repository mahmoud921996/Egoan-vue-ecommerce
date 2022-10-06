<template>
  <div class="search">
    <input type="text" placeholder="Search ..." />
    <a @click="handleClick">
      <BIconSliders2 />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconSliders2 } from "bootstrap-icons-vue";
import { useProducts } from "../../store/Products";

export default defineComponent({
  components: {
    BIconSliders2,
  },
  setup() {
    const store = useProducts();
    function handleClick() {
      store.toggleFilter();
    }
    return { handleClick };
  },
});
</script>
<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  width: 100%;
  input {
    width: 80%;
    padding: 15px 10px;
    font-size: 1.2rem;
    border-radius: 6px;
    display: inline-block;
    border: 1px solid #ccc;
    outline: none;
  }
  a {
    display: inline-block;
    margin-left: 20px;
    font-size: 2.4rem;
    cursor: pointer;
  }
}

@media (min-width: 991px) {
  .search {
    input {
      width: 100%;
    }
    a {
      display: none;
    }
  }
}
</style>
