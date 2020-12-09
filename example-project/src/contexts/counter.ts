import { readonly, ref } from "vue";
import { defineContext } from "vue-context-composition";

export const counter = defineContext(() => {
  const counter = ref(0);

  const increment = () => counter.value++;

  return {
    counter: readonly(counter),
    increment,
  };
});
