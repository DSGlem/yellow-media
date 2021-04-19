<template>
  <div id="app">
    <div>
      <button @click="currentTab = 'FrequencyCharacter'">
        FrequencyCharacter
      </button>
      <button @click="currentTab = 'TestForm'">TestForm</button>
      <button @click="currentTab = 'QueryParser'">QueryParser</button>
      <button @click="currentTab = 'ProductGallery'">ProductGallery</button>
    </div>
    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
import FrequencyCharacter from "@/components/FrequencyCharacter.vue";
import TestForm from "@/components/TestForm.vue";
import QueryParser from "@/components/QueryParser.vue";
import ProductGallery from "@/components/ProductGallery/ProductGallery.vue";

export default {
  name: "App",
  components: {
    FrequencyCharacter,
    TestForm,
    QueryParser,
    ProductGallery,
  },
  data() {
    return {
      currentTab: "FrequencyCharacter",
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");
@import "@/assets/styles/variables.scss";
#app {
  margin-top: 60px;

  color: var(--color-font-main);
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
