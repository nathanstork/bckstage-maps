import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import vueClickOutsideElement from "vue-click-outside-element";
import withUUID from "vue-uuid";
// @ts-ignore
import DateFormat from "@voidsolutions/vue-dateformat";

import "./assets/main.css";
import store from "@/store";

withUUID(createApp(App))
    .use(router)
    .use(store)
    .use(BootstrapIconsPlugin)
    .use(VueQueryPlugin)
    .use(vueClickOutsideElement)
    .use(DateFormat)
    .mount("#app");
