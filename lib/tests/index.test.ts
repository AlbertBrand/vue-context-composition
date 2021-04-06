import { defineComponent, h, ref } from "vue";
import { defineContext, provideContext, useContext } from "../src";
import { mount } from "@vue/test-utils";

const testContext = defineContext(() => {
  const test = ref("hello");
  return {
    test,
  };
});

test("usage of defineContext, provideContext, useContext", () => {
  const componentUsingContext = defineComponent({
    setup() {
      const context = useContext(testContext);
      return () => h("div", null, context.test.value);
    },
  });

  const componentProvidingContext = defineComponent({
    setup() {
      provideContext(testContext);
      return () => h(componentUsingContext);
    },
  });

  const wrapper = mount(componentProvidingContext);

  const testDiv = wrapper.get("div");
  expect(testDiv.text()).toBe("hello");
});

test("throws when context is not provided", () => {
  const componentUsingContext = defineComponent({
    setup() {
      expect(() => useContext(testContext)).toThrow();
      return () => h("div");
    },
  });

  mount(componentUsingContext, {
    global: {
      config: {
        warnHandler: () => undefined,
      },
    },
  });
});
