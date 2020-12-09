import { createApp } from "vue";
import { createContext } from "vue-context-composition";
import App from "./App.vue";
import { counter } from "./contexts/counter";

createApp(App)
  .provide(...createContext(counter))
  .mount("#app");
