<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <header>
        <nav class="container text-center">
            <div class="row">
                <div class="col-2">
                    <CogIcon />
                </div>
                <div class="col-8 d-flex align-items-center justify-content-center">
                    <img
                        src="../src/assets/logobackstagemaps.svg"
                        style="width: 70px !important; margin-top: 10px"
                    />
                    <h1 style="margin-left: 20px; margin-top: 10px">Backstagemaps</h1>
                </div>
                <div class="col-1">
                    <PSlusIcon />
                </div>
                <div class="col-1">
                    <button
                        v-if="isLoggedIn"
                        @click.prevent="signOut('test')"
                        class="btn btn-outline-primary"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <router-view />
    </main>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
import { onMounted } from "vue";
import CogIcon from "./components/Gearsettings.vue";
import PSlusIcon from "./components/plussettings.vue";
import store from "@/store";

export default {
    components: {
        CogIcon,
        PSlusIcon
    },
    computed: {
        isLoggedIn() {
            return store.state.user !== null;
        }
    },
    setup() {
        const signOut = ({ id }) => {
            console.log(id);
            store.dispatch("signOutAction");
        };

        onMounted(async () => {
            const { data, error } = await supabase.auth.refreshSession();
            store.commit("setUser", data.user);
        });
        return {
            signOut
        };
    }
};
</script>
