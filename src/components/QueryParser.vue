<template>
  <div>{{ queryObject }}</div>
</template>
<script>
import { parseURLSearch } from "@/helpers";
export default {
  data() {
    return {
      queryObject: null,
    };
  },
  created() {
    const search = window.location.search;
    this.queryObject = parseURLSearch(search);
  },
};
</script>