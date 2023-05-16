<template>
    <h1>Home</h1>
    <Auth />
    {{ user }}
</template>

<script>
import Auth from "@/components/Auth.vue";
import { onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";
import store from "@/store";
import router from "@/router";
// import store from "@/store";

export default {
    components: {
        Auth
    },
    setup() {
        onMounted(async () => {
            const { data, error } = await supabase.auth.refreshSession();
            store.commit("setUser", data.user);
            if (store.state.user !== null || data.user !== null) {
                router.push("/event-overview");
            }
        });
    },
    computed: {
        user() {
            return store.state.user;
        }
    }
};
</script>
