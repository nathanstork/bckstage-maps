import { createStore } from "vuex";
import router from "@/router";
import { supabase } from "@/lib/supabaseClient";

const store = createStore({
    state: {
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
        events: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        getUser(state) {
            return state.user;
        },
        getEvent(state) {
            return state.event;
        }
    },
    actions: {
        async signInAction() {
            const { data, error } = await supabase.auth.signInWithOAuth({ provider: "github" });
            if (error) throw error;
            await router.push("/events");
        },
        async signOutAction() {
            await supabase.auth.signOut();
            window.location.href = "/";
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
            console.log(event);
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
    }
});

export default store;
