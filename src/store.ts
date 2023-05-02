import { createStore } from "vuex";
import router from "@/router";
import { supabase } from "@/lib/supabaseClient";

const store = createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state: { user: any }, payload: any) {
            state.user = payload;
        },
        getUser(state: { user: any }) {
            return state.user;
        }
    },
    actions: {
        async signInAction() {
            const { data, error } = await supabase.auth.signInWithOAuth({ provider: "github" });
            if (error) throw error;
            await router.push("/signed-in");
        },
        async signOutAction() {
            await supabase.auth.signOut();
            window.location.href = "/";
        }
    }
});

export default store;
