import { createApp } from "vue";
import { createContext } from "vue-context-composition";
import App from "./App.vue";
import { counterCtx } from "./contexts/counter";

createApp(App)
  .provide(...createContext(counterCtx))
  .mount("#app");
