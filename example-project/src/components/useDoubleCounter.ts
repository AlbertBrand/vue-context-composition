import { useContext } from "vue-context-composition";
import { counterCtx } from "@/contexts/counter";
import { computed } from "vue";

export function useDoubleCounter() {
  const { counter } = useContext(counterCtx);
  const doubleCounter = computed(() => counter.value * 2);

  return {
    doubleCounter,
  };
}
