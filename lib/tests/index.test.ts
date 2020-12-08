import { defineComponent, h, ref } from "vue";
import { defineContext, provideContext, useContext } from "../src";
import { mount } from "@vue/test-utils";

test("usage of defineContext, provideContext, useContext", () => {
  const testContext = defineContext(() => {
    const test = ref("hello");
    return {
      test,
    };
  });

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
