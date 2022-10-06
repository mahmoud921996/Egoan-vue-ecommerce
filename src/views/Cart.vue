<template>
  <div class="cart-page">
    <div class="total">
      <h3>Total : {{ total }} $</h3>
      <button @click="clearCart">Clear</button>
    </div>
    <div class="cart-items" v-for="cartItem in cart" :key="cartItem.id">
      <div class="info">
        <img :src="cartItem.image" />
        <h3>{{ cartItem.title }}</h3>
      </div>
      <div class="quantity">
        <button @click="toggleAmount('dec', cartItem.id)">
          <BIconDash />
        </button>
        <span>{{ cartItem.amount }}</span>
        <button @click="toggleAmount('inc', cartItem.id)">
          <BIconPlus />
        </button>
      </div>
      <div class="actions">
        <h2>total : {{ cartItem.amount * cartItem.price }}$</h2>
        <a @click="remove(cartItem.id)">
          <BIconX />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCart } from "../store/Cart";
import { BIconDash, BIconPlus, BIconX } from "bootstrap-icons-vue";
export default defineComponent({
  components: {
    BIconDash,
    BIconPlus,
    BIconX,
  },
  setup() {
    const cartStore = useCart();
    const cart = computed(function () {
      return cartStore.cartItems;
    });

    function toggleAmount(value: string, id: string) {
      cartStore.toggleAmount({ value: value, id: id });
    }
    function remove(id: string) {
      cartStore.removeItem(id);
    }

    function clearCart() {
      cartStore.clearCart();
    }

    const total = computed(function () {
      return cartStore.totalItems;
    });
    console.log(total);
    return { cart, toggleAmount, remove, clearCart, total };
  },
});
</script>

<style lang="scss" scoped>
.cart-page {
  margin: 40px 20px;
  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    h3 {
      font-size: 1.4rem;
      font-weight: bold;
    }
    button {
      background-color: #8e2de2;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 6px;
      padding: 10px 25px;
      cursor: pointer;
      font-size: 1.4rem;
      transition: 0.3s;
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }
  }

  .cart-items {
    background-color: #ccc;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    margin-top: 30px;
    .info {
      text-align: center;
      padding: 20px 0;

      h3 {
        font-size: 1.4rem;
        font-weight: 500;
        margin: 20px 0 0;
      }
      img {
        width: 100%;
      }
    }
    .quantity {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 500;
      margin: 20px 0;
      button {
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        font-size: 1.4rem;
        font-weight: 500;
        cursor: pointer;
      }
      span {
        border: 1px solid #111;
        padding: 10px 15px;
      }
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      margin: 20px 0;
      h2 {
        font-size: 1.4rem;
        font-weight: 400;
        margin: 0;
      }
      a {
        font-size: 1.6rem;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@media (min-width: 768px) {
  .cart-page {
    .cart-items {
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 20px;
      .info {
        display: flex;
        align-items: center;
        margin-right: 20px;
        flex: 1;
        max-width: 40%;
        gap: 30px;
        h3 {
          margin: 0;
          max-width: 40%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 130px;
        }
      }
      .quantity {
        margin: 20px 10px;
        flex: 1;
        span {
          padding: 10px;
        }
      }
      .actions {
        gap: 20px;

        a {
          font-size: 1.6rem;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
