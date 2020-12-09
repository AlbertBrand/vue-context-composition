<template>
  <h1>Context example</h1>

  <h2>Application setup</h2>
  <p>
    The counter context is provided on application level and can be used from
    the root component.
  </p>
  <div id="desc">Root component counter value: {{ counter }}</div>
  <button @click="increment">Increment</button>

  <p>
    Any child has access to the counter context.
  </p>
  <counter-child />
  <counter-child />

  <h2>Component setup</h2>
  <p>
    A component can provide context as well in its <code>setup()</code> function
    to all its descendents. It will override application level context.
  </p>
  <counter-provider>
    <counter-child />
    <counter-child />
  </counter-provider>

  <h2>Composition of contexts</h2>
  <p>
    Using the context is just a function, so it's possible to extract it and
    place it outside of the component.
  </p>
  <counter-double />

  <p>
    The context is dependent on the ancestor, so it's easy to create a separate
    provider.
  </p>
  <counter-provider>
    <counter-child />
    <counter-double />
  </counter-provider>

  <h2>Read only context</h2>
  <p>
    It's up to the context to 'seal' the state using
    <code>readonly</code> provided by Vue. This has full TypeScript support, so
    code manipulating the context does not compile. Even in the case of ignoring
    all TypeScript errors, at runtime manipulation is blocked.
  </p>
  <p>Try setting the counter to 100 and check the console:</p>
  <button @click="trySetCounter">Set counter to 100</button>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { useContext } from "vue-context-composition";
import CounterChild from "@/components/CounterChild.vue";
import CounterProvider from "@/components/CounterProvider.vue";
import CounterDouble from "./components/CounterDouble.vue";
import { counter as counterDef } from "@/contexts/counter";

export default defineComponent({
  components: { CounterChild, CounterProvider, CounterDouble },
  name: "App",
  setup() {
    const { counter, increment } = useContext(counterDef);

    const trySetCounter = () => {
      // @ts-ignore
      counter.value = 100;
    };

    return {
      counter,
      increment,
      trySetCounter,
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
