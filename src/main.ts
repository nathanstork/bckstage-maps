import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import vueClickOutsideElement from "vue-click-outside-element";
import withUUID from "vue-uuid";
// @ts-ignore
import DateFormat from "@voidsolutions/vue-dateformat";
import store from "@/store";
import "./assets/main.css";

withUUID(createApp(App))
    .use(store)
    .use(router)
    .use(BootstrapIconsPlugin)
    .use(VueQueryPlugin)
    .use(vueClickOutsideElement)
    .use(DateFormat)
    .mount("#app");
