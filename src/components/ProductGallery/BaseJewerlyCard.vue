<template>
  <div class="card">
    <div class="card__header">
      <span># {{ id }}</span>
      <span>{{ title }}</span>
      <span>{{ sku }}</span>
    </div>
    <div class="card__image">
      <img class="responsive-image" :src="src" alt="product image" />
    </div>
    <div class="card__options options">
      <div class="options__header">product options:</div>
      <div class="options__content">
        <div
          class="options__item"
          v-for="item in options"
          :key="item.name + item[item.name]"
        >
          <span class="options__key">{{ item.name }}:</span>
          <span class="options__value">{{ item.value }}</span>
        </div>
      </div>
    </div>
    <div class="card__footer">{{ getFormattedPrice }}</div>
  </div>
</template>
<script>
import { formatPrice } from "@/helpers";
export default {
  props: {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    sku: {
      type: String,
    },
    src: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
    },
    price: {
      type: Number,
    },
    options: {
      type: Array,
    },
    currency: {
      type: String,
    },
  },
  computed: {
    getFormattedPrice() {
      return formatPrice(this.price, this.currency);
    },
  },
};
</script>
<style lang="scss" scoped>
$baseMargin: 10px;
// card
.card {
  padding: 16px;
  border: 1px solid var(--color-border);
  font-size: 14px;
}
.card__header {
  display: grid;
  color: var(--color-font-secondary);
}
.card__image {
  margin-top: $baseMargin;
}
.card__options {
  margin-top: $baseMargin;
}
.card__footer {
  margin-top: $baseMargin * 2;
  font-size: 2em;
  font-weight: 600;
}
// utilities
.responsive-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
// options
.options__header {
  font-weight: 600;
  text-transform: uppercase;
}
.options__content {
  margin-top: 10px;
  display: grid;
  gap: 4px 0;
  color: var(--color-font-secondary);
}
.options__item {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: start;
  gap: 0 4px;
}
</style>