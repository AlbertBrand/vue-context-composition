<p align="center">
  <a href="https://github.com/AlbertBrand/vue-context-composition">
    <img src="./img/vue-context-composition.png" width="469" alt="Vue context composition" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-context-composition">
    <img src="https://img.shields.io/npm/v/vue-context-composition.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/vue-context-composition">
    <img src="https://img.shields.io/npm/dm/vue-context-composition.svg" alt="npm downloads">
  </a>
  <a href="https://bundlephobia.com/result?p=vue-context-composition">
    <img src="https://img.shields.io/bundlephobia/min/vue-context-composition.svg" alt="minified size">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/vue-context-composition.svg" alt="license">
  </a>
  <a href="https://github.com/AlbertBrand/vue-context-composition/issues">
    <img src="https://img.shields.io/github/issues/AlbertBrand/vue-context-composition.svg" alt="issues">
  </a>
  <a href="https://github.com/AlbertBrand/vue-context-composition/pulls">
    <img src="https://img.shields.io/github/issues-pr/AlbertBrand/vue-context-composition.svg" alt="pull requests">
  </a>
</p>

`vue-context-composition` makes sharing your composed state a breeze! It's the missing `useContext`
hook from React, reimplemented for Vue.js 3.0.

## Installation

```bash
npm install --save vue-context-composition
```

Or with Yarn:

```bash
yarn add vue-context-composition
```

## Usage

### defineContext

Define a context that can be provided and used in the component hierarchy. Pass in a create function
that will be run as part of `setup()`. All Vue reactive methods such as `computed` may be used.

```ts
export const userNameCtx = defineContext(() => {
  const userName = ref("");
  const uppercaseUserName = computed(() => userName.value.toUpperCase());
  const setUserName = (name) => {
    userName.value = name;
  };
  return {
    userName: readonly(userName),
    uppercaseUserName,
    setUserName,
  };
});
```

### provideContext

Provide context from a component in the hierarchy. All descendant components can then use that
context.

```ts
import { userName } from "@contexts/user";

export default defineComponent({
  setup() {
    provideContext(userName);
  },
});
```

### createContext

Shorthand function to create a context that can be provided to all components in the application
setup.

```ts
import { userName } from "@contexts/user";

createApp(App)
  .provide(...createContext(userName))
  .mount("#app");
```

### useContext

Use context provided in an ancestor component or in application setup.

```ts
import { userName } from "@contexts/user";

export default defineComponent({
  setup() {
    const { uppercaseUserName, setUserName } = useContext(userName);
    return {
      uppercaseUserName,
      setUserName,
    };
  },
});
```

## Example project

See the [example Vue3 project](../example-project) folder for a project with several examples.
