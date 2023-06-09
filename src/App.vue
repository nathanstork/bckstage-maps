<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <!--      <header>-->
    <!--        <nav class="container text-center">-->
    <!--            <div class="row">-->
    <!--                <div class="col-2">-->
    <!--                    <CogIcon />-->
    <!--                </div>-->
    <!--                <div class="col-10 d-flex align-items-center justify-content-center">-->
    <!--                    <div class="image-container">-->
    <!--                        <img-->
    <!--                            src="src/assets/logobackstagemaps.svg"-->
    <!--                            style="width: 60px; margin-top: 5px"-->
    <!--                            class="hover-image"-->
    <!--                        />-->
    <!--                        <span class="hover-text">Bckstagemaps</span>-->
    <!--                    </div>-->
    <!--                </div>-->

    <!--                <div class="col-2">-->
    <button
        v-if="isLoggedIn"
        @click.prevent="signOut('test')"
        class="btn btn-outline-primary"
        style="margin: 10px 0px 0px 10px; width: 140px; z-index: 5"
    >
        Log out
    </button>
    <!--                </div>-->
    <!--            </div>-->
    <!--        </nav>-->
    <!--    </header>-->
    <main>
        <!--      Hoort niet hier -->
        <!--        <div class="objectform col-2 align-items-right" style="float: right; margin-top: 20px">-->
        <!--            <objectzone></objectzone>-->
        <!--        </div>-->
        <router-view />
    </main>
</template>

<style>
.image-container {
    position: relative;
    display: inline-block;
}

.hover-text {
    position: absolute;
    font-size: 24px;
    top: 32px;
    left: 60px;
    transform: translateY(-50%);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    white-space: nowrap;
}

.hover-image:hover + .hover-text {
    opacity: 1;
    pointer-events: auto;
}
</style>

<script>
import { supabase } from "@/lib/supabaseClient";
import { onMounted } from "vue";
import CogIcon from "./components/Gearsettings.vue";
import objectzone from "./components/objectform.vue";
import store from "@/store";
import EasyAdd from "@/components/EasyAdd.vue";

export default {
    components: {
        CogIcon,
        EasyAdd,
        objectzone
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
