<template>
  <div class="card">
    <router-link :to="DeatilsLink">
      <div class="image">
        <img :src="product.images[0]" alt="Product Image" />
      </div>
    </router-link>
    <div class="card-footer">
      <h3>{{ product.title }}</h3>
      <div class="actions">
        <p class="price">
          <span>price</span>
          <span>{{ formatPrice(product.price) }}</span>
        </p>
        <button @click="addCart">Add</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Product } from "../../types/index";
import { useRoute, useRouter } from "vue-router";
import { formatPrice } from "../../utils/helpers";
import { useCart } from "../../store/Cart";
export default defineComponent({
  props: {
    product: {
      required: true,
      type: Object as PropType<Product>,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCart();
    const DeatilsLink = computed(function () {
      return route.path + "product/" + props.product.id;
    });
    function addCart() {
      cartStore.addItem({
        product: props.product,
        id: props.product.id,
        amount: 1,
      });
      router.push("/cart");
    }
    return { product: props.product, formatPrice, DeatilsLink, addCart };
  },
});
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 5px rgba(48, 48, 48, 0.2);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  .image {
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .card-footer {
    padding: 20px;
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .price {
        display: flex;
        flex-direction: column;
        font-size: 20px;

        & span:first-of-type {
          line-height: 20px;
          opacity: 0.7;
        }
        & span:last-child {
          font-size: 20px;
          font-weight: 500;
          margin-top: 10px;
        }
      }
      button {
        display: inline-block;
        padding: 10px 25px;
        border: none;
        outline: none;
        border: 1px solid #8e2de2;
        color: #8e2de2;
        background-color: #fff;
        font-size: 20px;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.3s;
        &:hover {
          background-color: #8e2de2;
          color: #fff;
        }
      }
    }
  }
}
</style>
