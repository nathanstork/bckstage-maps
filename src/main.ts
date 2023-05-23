import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import { VueQueryPlugin } from "vue-query";
import vueClickOutsideElement from "vue-click-outside-element";

import DateFormat from "@voidsolutions/vue-dateformat";
import "./assets/main.css";

createApp(App)
    .use(router)
    .use(BootstrapIconsPlugin)
    .use(VueQueryPlugin)
    .use(vueClickOutsideElement)
    .use(DateFormat)
    .mount("#app");
