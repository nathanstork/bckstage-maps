import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import EventsOverview from "@/views/EventsOverview.vue";
import EventCreate from "@/views/EventCreate.vue";
import NotFound from "@/views/NotFoundView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Home route
        {
            path: "/",
            name: "Home",
            component: Home,
            meta: {
                title: "Home"
            }
        },
        // Events Overview route
        {
            path: "/events",
            name: "EventsOverview",
            component: EventsOverview,
            meta: {
                title: "Events Overview"
            }
        },
        // Event Create route
        {
            path: "/event-create",
            name: "EventCreate",
            component: EventCreate,
            meta: {
                title: "Event Create"
            }
        },
        // Event route
        {
            path: "/event/:id",
            name: "Event",
            component: () => import("../views/EventView.vue"), // Lazy load the view
            meta: {
                title: "Event"
            },
            props: true
        },
        // Event Update route
        {
            path: "/event/:id/edit",
            name: "EventUpdate",
            component: () => import("../views/EventUpdate.vue"),
            meta: {
                title: "Event Update"
            },
            props: true
        },
        // Not Found route
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: NotFound,
            meta: {
                title: "404"
            }
        }
    ]
});
export default router;
