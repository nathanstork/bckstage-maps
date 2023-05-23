import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import EventsOverview from "@/views/EventsOverview.vue";
import EventCreate from "@/views/EventCreate.vue";
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
                next({ name: "EventsOverview" });
            }
            // @ts-ignore
            next();
        }
    },
    {
        path: "/events",
        name: "EventsOverview",
        component: EventsOverview,
        meta: {
            title: "Events overview"
        },
        beforeEnter: (to: any, from: any, next: (arg0: { name: string } | undefined) => void) => {
            if (!checks.isLoggedIn()) {
                next({ name: "Home" });
            }
            // @ts-ignore
            next();
        }
    },
    {
        path: "/event-create",
        name: "EventCreate",
        component: EventCreate,
        meta: {
            title: "Event create"
        },
        beforeEnter: (to: any, from: any, next: (arg0: { name: string } | undefined) => void) => {
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
        props: true,
        beforeEnter: (to: any, from: any, next: (arg0: { name: string } | undefined) => void) => {
            if (!checks.isLoggedIn()) {
                next({ name: "Home" });
            }
            // @ts-ignore
            next();
        }
    },
    {
        path: "/event/:id/edit",
        name: "EventUpdate",
        component: () => import("../views/EventUpdate.vue"),
        meta: {
            title: "Event Edit"
        },
        props: true,
        beforeEnter: (to: any, from: any, next: (arg0: { name: string } | undefined) => void) => {
            if (!checks.isLoggedIn()) {
                next({ name: "Home" });
            }
            // @ts-ignore
            next();
        }
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
