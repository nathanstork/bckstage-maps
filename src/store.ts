import { createStore } from "vuex";
import router from "@/router";
import { supabase } from "@/lib/supabaseClient";

// @ts-ignore
const store = createStore({
    state() {
        return {
            user: {
                id: null
            },
            event: {
                name: "",
                starts_at: "",
                ends_at: "",
                created_by: "",
                id: ""
            },
            newUnit: {
                name: "",
                event_id: "",
                unit_type: ""
            },
            events: []
        };
    },
    getters: {
        getUser: state => state.user,
        getEvent: state => state.event
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async fetchUser() {
            const { data, error } = await supabase.auth.refreshSession();
            store.commit("setUser", data.user);
            if (store.state.user !== null && store.state.user.id !== null) {
                router.push("/events");
            }
        },
        async authenticatedToEvents() {
            if (store.state.user !== null && store.state.user.id !== null) {
                router.push("/events");
            }
        },
        async notAuthenticatedToHome() {
            if (store.state.user === null || store.state.user.id === null) {
                router.push("/");
            }
        },
        async signOutAction() {
            await supabase.auth.signOut();
            await router.push("/");
        },
        async eventCreate() {
            let event = store.state.event;
            let user = store.state.user;
            const { data, error } = await supabase.from("events").insert({
                created_by: user.id,
                name: event.name,
                starts_at: event.starts_at,
                ends_at: event.ends_at
            });
            if (error) throw error;
            await router.push("/events");
        },
        async eventUpdate() {
            let event = store.state.event;
            const { data, error } = await supabase
                .from("events")
                .update({
                    name: event.name,
                    starts_at: event.starts_at,
                    ends_at: event.ends_at
                })
                .eq("id", event.id);
            if (error) throw error;
            await router.push("/events");
        }
        // async unitCreate() {
        //     let newUnit = store.state.newUnit;
        //     console.log(newUnit);
        //     console.log(newUnit.event_id);
        //     const { data, error } = await supabase.from("units").insert({
        //         event_id: newUnit.event_id,
        //         name: newUnit.name,
        //         type: newUnit.unit_type,
        //         x: "A",
        //         y: 1
        //     });
        //     if (error) throw error;
        // }
    }
});

export default store;
