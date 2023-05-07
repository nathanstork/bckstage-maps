import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home"
        }
    },
    {
        path: "/sign-in",
        name: "SignIn",
        component: SignIn,
        meta: {
            title: "Sign In"
        }
    },
    {
        path: "/event/:id",
        name: "Event",
        component: () => import("../views/EventView.vue"), // Lazy load the view
        meta: {
            title: "Event"
        },
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: {
            title: "404"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const formatTitle = (title: string) => `${title} | Bckstage Maps`;

router.beforeEach((to, from, next) => {
    const title = to.meta.title as string;
    if (title) document.title = formatTitle(title);

    next();
});

export default router;
