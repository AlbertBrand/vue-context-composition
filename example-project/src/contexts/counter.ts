import { readonly, ref } from "vue";
import { defineContext } from "vue-context-composition";

export const counterCtx = defineContext(() => {
  const counter = ref(0);

  const increment = () => counter.value++;

  return {
    counter: readonly(counter),
    increment,
  };
});
