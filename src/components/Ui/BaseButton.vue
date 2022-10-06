<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :class="mode" :to="to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    mode: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    to: {
      type: String as PropType<string>,
      required: false,
      default: "/",
    },
    link: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
button,
a {
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
}
a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}
.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
  &:hover,
  &:active {
    background-color: #edd2ff;
  }
}
.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
  &:hover,
  &:active {
    background-color: #edd2ff;
  }
}
</style>
