<template>
  <div class="images-wrapper">
    <div class="main-image">
      <img :src="mainImg" />
    </div>
    <div class="gallery">
      <div
        class="img-sumbnail"
        v-for="(img, idx) in images"
        :key="img"
        @click="setMain(idx)"
        :class="{ active: images[idx] === mainImg }"
      >
        <img :src="img" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";

export default defineComponent({
  props: {
    images: {
      required: true,
      type: Array as PropType<string[]>,
    },
  },
  setup(props) {
    const mainImg = ref<string>(props.images[0]);
    function setMain(idx: number) {
      mainImg.value = props.images[idx];
    }
    return { mainImg, setMain };
  },
});
</script>

<style lang="scss" scoped>
.images-wrapper {
  margin-bottom: 20px;
  .main-image {
    width: 400px;
    margin: 20px auto;
    border-radius: 6px;
    img {
      width: 100%;
    }
  }
  .gallery {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 100px);
    gap: 20px;
    .img-sumbnail {
      border: 1px solid #ccc;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active {
        border: 2px solid #8e2de2;
      }
      img {
        width: 100%;
      }
    }
  }
}
@media (min-width: 768px) {
  .images-wrapper {
    margin-bottom: 0;
    .main-image {
      min-width: 200px;
      margin: 20px auto;
      border-radius: 6px;
      img {
        width: 100%;
      }
    }
    .gallery {
      grid-template-columns: repeat(3, 120px);
    }
  }
}
</style>
