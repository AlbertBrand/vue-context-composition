import { useContext } from "vue-context-composition";
import { counter as counterDef } from "@/contexts/counter";
import { computed } from "vue";

export function useDoubleCounter() {
  const { counter } = useContext(counterDef);
  const doubleCounter = computed(() => counter.value * 2);

  return {
    doubleCounter,
  };
}
