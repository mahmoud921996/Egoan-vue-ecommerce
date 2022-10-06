<template>
  <div class="sidebar" v-show="showFilter">
    <div class="categories">
      <h2>Categories</h2>
      <div class="options">
        <div v-for="catg in categories" :key="catg.id" class="form-control">
          <input
            type="checkbox"
            name="category"
            :id="catg.name"
            @change="setFilter"
            checked
          />
          <label :for="catg.name">{{ catg.name }}</label>
        </div>
      </div>
    </div>
    <div class="range">
      <h2>Price</h2>
      <form @submit.prevent="setPrice">
        <div class="inputs">
          <input
            type="number"
            name="minPrice"
            placeholder="min"
            v-model="price.minPrice"
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="max"
            v-model="price.maxPrice"
          />
        </div>
        <button class="btn" type="submit">set price</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useProducts } from "../../store/Products";
import { Filter, Price } from "../../types/index";
export default defineComponent({
  setup() {
    const store = useProducts();

    const maxValue = computed(() => {
      return store.getPrice.maxPrice;
    });
    const price = ref<Price>({
      minPrice: 0,
      maxPrice: maxValue.value,
    });
    const filters = ref<Filter>({
      clothes: true,
      electronics: true,
      furniture: true,
      shoes: true,
      others: true,
    });
    const categories = computed(function () {
      return store.allCategories;
    });
    const showFilter = computed(function () {
      return store.show;
    });

    function setFilter(e: Event) {
      const inputId = (e.target as HTMLInputElement).id.toLowerCase();
      const checked = (e.target as HTMLInputElement).checked;
      const updatedFilter = {
        ...filters.value,
        [inputId]: checked,
      };
      filters.value = updatedFilter;
      store.updateFilter({ name: inputId, value: checked });
      store.filterItems();
    }

    function setPrice() {
      store.updatePrice({
        minPrice: price.value.minPrice,
        maxPrice: price.value.maxPrice,
      });
      store.filterItems();
    }
    return {
      categories,
      showFilter,
      setFilter,
      price,
      setPrice,
      maxValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  text-align: center;
  h2 {
    font-size: 1.8rem;
  }
  .categories {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .options {
      display: flex;
      flex-wrap: wrap;
      margin: 10px;
      .form-control {
        display: flex;
        align-items: center;
        label {
          position: relative;
          cursor: pointer;
          margin: 0 10px;
          display: inline-block;
          font-size: 1.3rem;
          transition: 0.3s;
        }
      }
    }
  }
  .range {
    margin-top: 30px;
    border-bottom: 1px solid #ccc;
    .inputs {
      margin-top: 15px;
      input {
        border: 2px solid #ddd;
        background-color: #fbfbfd;
        width: 110px;
        height: 60px;
        font-size: 1.5rem;
        display: inline-block;
        padding: 10px;
        border-radius: 6px;
        margin-right: 10px;
      }
    }
    .btn {
      border: none;
      outline: none;
      border-radius: 6px;
      margin-top: 20px;
      font-size: 1.5rem;
      font-weight: 600;
      width: fit-content;
      margin: 20px auto;
      cursor: pointer;
      display: block;
      padding: 15px 60px;
      position: relative;
      letter-spacing: 0.05em;
      color: #fff;
      transition: 0.3s;
      background-color: #8e2de2;
    }
  }
}

@media (min-width: 991px) {
  .sidebar {
    text-align: left;
    h2 {
      margin-left: 10px;
    }
    .categories {
      display: flex;
      align-items: stretch;
      .options {
        flex-direction: column;
        flex-wrap: nowrap;
      }
    }

    .range {
      .inputs {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn {
        padding: 15px 30px;
      }
    }
  }
}
</style>
