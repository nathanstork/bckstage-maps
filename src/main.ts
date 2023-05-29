import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import vueClickOutsideElement from "vue-click-outside-element";
// @ts-ignore
import DateFormat from "@voidsolutions/vue-dateformat";

import "./assets/main.css";

createApp(App)
    .use(router)
    .use(BootstrapIconsPlugin)
    .use(VueQueryPlugin)
    .use(vueClickOutsideElement)
    .use(DateFormat)
    .mount("#app");
