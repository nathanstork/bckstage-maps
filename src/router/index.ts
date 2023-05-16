import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import SignedIn from "@/views/SignedIn.vue";
import NotFound from "@/views/NotFound.vue";
import store from "@/store";

const checks = {
    isLoggedIn: function () {
        return store.state.user !== null;
    }
};

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "Home"
        },
        beforeEnter: async (
            to: any,
            from: any,
            next: (arg0: { name: string } | undefined) => void
        ) => {
            if (checks.isLoggedIn()) {
                next({ name: "SignedIn" });
            }
            // @ts-ignore
            next();
        }
    },
    {
        path: "/signed-in",
        name: "SignedIn",
        component: SignedIn,
        meta: {
            title: "Signed In"
        },
        beforeEnter: (to: any, from: any, next: (arg0: { name: string } | undefined) => void) => {
            console.log(store.state.user);
            if (!checks.isLoggedIn()) {
                next({ name: "Home" });
            }
            // @ts-ignore
            next();
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
