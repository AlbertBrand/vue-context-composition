<template>
  <div id="desc">Child component counter value: {{ counter }}</div>
  <button @click="increment">Increment</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useContext } from "vue-context-composition";
import { counter as counterDef } from "@/contexts/counter";

export default defineComponent({
  name: "CounterChild",
  setup() {
    const { counter, increment } = useContext(counterDef);

    return {
      counter,
      increment,
    };
  },
});
</script>

<style scoped>
#desc {
  font-weight: bold;
}
button {
  display: block;
  margin: 1em 0;
}
</style>
