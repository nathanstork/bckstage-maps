import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { VueQueryPlugin } from "vue-query";
import DateFormat from "@voidsolutions/vue-dateformat";
import "./assets/main.css";

createApp(App).use(router).use(VueQueryPlugin).use(DateFormat).mount("#app");
