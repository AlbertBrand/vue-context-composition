<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideContext } from "vue-context-composition";
import { counterCtx } from "@/contexts/counter";

export default defineComponent({
  name: "CounterProvider",
  setup() {
    provideContext(counterCtx);
  },
});
</script>
