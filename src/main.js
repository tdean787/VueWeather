import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
window.axios = require("axios");
require("dotenv").config();

createApp(App)
  .use(router)
  .mount("#app");
