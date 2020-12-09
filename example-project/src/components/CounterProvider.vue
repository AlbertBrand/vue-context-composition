<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideContext, useContext } from "vue-context-composition";
import { counter } from "@/contexts/counter";

export default defineComponent({
  name: "CounterProvider",
  setup() {
    provideContext(counter);
  },
});
</script>
