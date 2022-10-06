<template>
  <div class="home">
    <div class="sidebar">
      <SideBar />
    </div>
    <base-dialogue :show="loading" title="Loading..." fixed>
      <base-spinner />
    </base-dialogue>
    <div class="products-content" v-if="!loading">
      <div class="search">
        <Search />
      </div>

      <div class="products">
        <ProductItem
          v-for="product in paginatedArray"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="pagination" v-if="paginatedArray.length >= 1">
        <ul>
          <li
            class="pagination-btn"
            @click="onePageBackHandler"
            :class="{ disabled: currentPage === pageNumbers[0] }"
          >
            <BIconArrowLeft />
          </li>
          <li
            v-for="page in pageNumbers"
            :key="page"
            class="page-number"
            :class="{ active: currentPage === page }"
            @click="setCurrentPage(page)"
          >
            {{ page }}
          </li>
          <li
            class="pagination-btn"
            :class="{ disabled: currentPage === pageNumbers.length }"
            @click="onePageForwardHandler"
          >
            <BIconArrowRight />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { BIconArrowLeft, BIconArrowRight } from "bootstrap-icons-vue";
import ProductItem from "./ProductItem.vue";
import SideBar from "../layout/SideBar.vue";
import { useProducts } from "../../store/Products";
import Search from "./Search.vue";
import { Product } from "../../types";
export default defineComponent({
  components: {
    ProductItem,
    BIconArrowLeft,
    BIconArrowRight,
    SideBar,
    Search,
  },
  setup() {
    const loading = ref<boolean>(false);
    const store = useProducts();
    // load all products
    async function loadData() {
      loading.value = true;
      try {
        await store.loadProducts();
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    }
    loadData();
    //pagination
    const pageSize = 9;

    const currentPage = ref<number>(1);

    const indexOfLastProduct = computed(() => {
      return currentPage.value * pageSize;
    });
    const indexOfFirstProduct = computed(() => {
      return indexOfLastProduct.value - pageSize;
    });

    const filteredProducts = computed(function () {
      return store.getFilteredProducts;
    });

    let paginatedArray = computed(() => {
      return filteredProducts.value.slice(
        indexOfFirstProduct.value,
        indexOfLastProduct.value
      );
    });
    /// array of pages
    const pageNumbers = computed<number[]>(function () {
      return Array.from(
        { length: Math.ceil(filteredProducts.value.length / pageSize) },
        (_, i) => i + 1
      );
    });
    // back button handler
    function onePageBackHandler() {
      if (currentPage.value !== 1) {
        currentPage.value = currentPage.value - 1;
      }
    }
    // forward button handler
    function onePageForwardHandler() {
      if (
        currentPage.value !==
        Math.ceil(filteredProducts.value.length / pageSize)
      ) {
        currentPage.value = currentPage.value + 1;
      }
    }
    // changing current page
    function setCurrentPage(num: number) {
      currentPage.value = num;
    }
    return {
      filteredProducts,
      loading,
      pageNumbers,
      currentPage,
      onePageBackHandler,
      onePageForwardHandler,
      paginatedArray,
      setCurrentPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr;
  .sidebar {
    padding-top: 20px;
  }
  .products-content {
    margin-top: 40px;
    .search {
      width: 90%;
      margin: auto;
    }
    .products {
      margin: 40px 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
  }
}

@media screen and (min-width: 992px) {
  .home {
    grid-template-columns: 250px 1fr;

    .sidebar {
      border-right: 1px solid #ccc;
    }
  }
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
    .pagination-btn {
      border: 1px solid #ccc;
      outline: none;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 5px;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 50%;
      background-color: #fff;
      &:hover,
      &.active {
        background-color: #8e2de2;
        color: #fff;
      }
      &.disabled {
        cursor: initial;
        background-color: rgb(243, 242, 247);
        color: #6e6b7b;
      }
      &.disabled:hover {
        pointer-events: none;
      }
    }
    .page-number {
      font-size: 1.2rem;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
      margin: 0 5px;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: #8e2de2;
        color: #fff;
      }
    }
  }
}
</style>
