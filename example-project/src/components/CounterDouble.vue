<template>
  <div id="desc">Double counter value: {{ doubleCounter }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDoubleCounter } from "./useDoubleCounter";

export default defineComponent({
  name: "CounterDouble",
  setup() {
    const { doubleCounter } = useDoubleCounter();

    return {
      doubleCounter,
    };
  },
});
</script>

<style scoped>
#desc {
  font-weight: bold;
}
</style>
