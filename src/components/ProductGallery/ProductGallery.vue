<template>
  <div class="gallery">
    <div>Product Gallery</div>
    <div class="gallery__list">
      <BaseJewerlyCard
        v-for="item in cards"
        :key="item.id"
        v-bind="item"
      ></BaseJewerlyCard>
    </div>
  </div>
</template>
<script>
import BaseJewerlyCard from "@/components/ProductGallery/BaseJewerlyCard.vue";
import { apiInstance } from "@/api/BaseApi";
import { transformProductFromBack } from "@/helpers";
export default {
  components: { BaseJewerlyCard },
  data() {
    return {
      cards: [],
    };
  },
  async created() {
    this.cards = (await apiInstance.getProductList()).map((item) => {
      return transformProductFromBack(item);
    });
  },
};
</script>
<style lang="scss" scoped>
.gallery__list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 6px;
}
</style>