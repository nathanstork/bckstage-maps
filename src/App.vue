<template>
    <div>
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
import { onMounted } from "vue";
import store from "@/store";

export default {
    setup() {
        onMounted(async () => {
            const { data, error } = await supabase.auth.refreshSession();
            store.commit("setUser", data.user);
        });
    }
};
</script>
