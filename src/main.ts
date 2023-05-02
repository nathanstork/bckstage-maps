import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "./assets/main.css";
import store from "@/store";

// @ts-ignore
createApp(App).use(router, store).mount("#app");
