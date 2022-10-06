<template>
  <div v-if="loading">
    <base-spinner></base-spinner>
  </div>
  <div class="product" v-else>
    <div class="images-container">
      <ProductImages :images="images" />
    </div>
    <div class="text-info">
      <div class="text">
        <h3>Category : {{ category }}</h3>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <p class="price">price :{{ price }}</p>
      <div class="content">
        <p>Quantity</p>
        <div class="actions">
          <div class="addCart">
            <button type="button" @click="decrease">
              <BIconDash />
            </button>
            <span>{{ amount }}</span>
            <button type="button" @click="increase">
              <BIconPlus />
            </button>
          </div>
          <div class="total">Total: {{ total }}</div>
        </div>
        <button class="btn" @click="addCart">Add To cart</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ProductImages from "../components/SingleProduct/ProductImages.vue";
import { BIconPlus, BIconDash } from "bootstrap-icons-vue";
import { Product } from "../types/index";
import { formatPrice } from "../utils/helpers";
import { useCart } from "../store/Cart";
export default defineComponent({
  components: {
    ProductImages,
    BIconPlus,
    BIconDash,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const amount = ref<number>(1);
    const loading = ref<boolean>(false);
    const cartStore = useCart();
    function increase() {
      let tempAmount = amount.value + 1;
      amount.value = tempAmount;
    }
    function decrease() {
      let tempAmount = amount.value - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      amount.value = tempAmount;
    }
    function addCart() {
      cartStore.addItem({
        id: props.id,
        product: selectedProduct.value,
        amount: amount.value,
      });
    }
    const selectedProduct = ref<Product>({
      id: "",
      title: "",
      price: 0,
      description: "",
      category: {
        id: 0,
        name: "",
        image: "",
      },
      images: [""],
    });

    async function loadProduct() {
      loading.value = true;
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${props.id}`
        );
        const data = await res.json();
        selectedProduct.value = data;
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    loadProduct();
    const category = computed(function () {
      return selectedProduct.value.category.name;
    });
    const title = computed(function () {
      return selectedProduct.value.title;
    });
    const description = computed(function () {
      return selectedProduct.value.description;
    });
    const price = computed(function () {
      return formatPrice(selectedProduct.value.price);
    });
    const total = computed(function () {
      return formatPrice(selectedProduct.value.price * amount.value);
    });
    const images = computed(function () {
      return selectedProduct.value.images;
    });
    return {
      selectedProduct,
      category,
      images,
      title,
      description,
      price,
      amount,
      increase,
      decrease,
      total,
      loading,
      addCart,
    };
  },
});
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  gap: 40px;
  margin-top: 30px;
  .images-container {
    border-bottom: 1px solid #ccc;
  }
  .text-info {
    margin: 0 10px 20px;

    .text {
      color: #4b505e;
      h3 {
        margin-bottom: 20px;
      }
      p {
        margin-top: 20px;
        color: #4b505e;
        font-weight: 400;
      }
    }
    .price {
      margin-top: 3rem;
      font-size: 1.4rem;
      font-weight: bold;
    }
    .content {
      margin-top: 3rem;
      p {
        color: #4b505e;
        font-size: 1.4rem;
        font-weight: bold;
      }
      .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0;
        max-width: 500px;
        .addCart {
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            display: inline-block;
            width: 30px;
            height: 30px;
            background-color: #8e2de2;
            color: #fff;
            font-size: 1.2rem;
            line-height: 15px;
            margin: 0 10px;
            font-weight: bold;
            border: none;
            outline: none;
            border-radius: 6px;
            cursor: pointer;
          }
          span {
            color: #111;
            font-size: 1.2rem;
          }
        }
        .total {
          color: #111;
          font-size: 1.2rem;
          font-weight: bold;
        }
      }
      .btn {
        background-color: #8e2de2;
        color: #fff;
        font-size: 1.4rem;
        border: 1px solid #8e2de2;
        outline: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 6px;
        display: block;
      }
    }
  }
}

@media (min-width: 768px) {
  .product {
    grid-template-columns: 1fr 1fr;
    .images-container {
      border-bottom-color: transparent;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
