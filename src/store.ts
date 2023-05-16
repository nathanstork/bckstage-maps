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
            ends_at: ""
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
            await router.push("/event-overview");
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
            await router.push("/event-overview");
        }
    }
});

export default store;
