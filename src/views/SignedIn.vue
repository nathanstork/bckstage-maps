<template>
    <div class="flex items-center h-full">
        <h1 class="text-2xl font-semibold">Signed In</h1>
    </div>
    <button @click.prevent="signOut" class="btn btn-close-white">Log out</button>
    {{ user }}
</template>

<script>
import store from "@/store";

export default {
    setup() {
        const signOut = () => {
            store.dispatch("signOutAction");
        };
        return {
            signOut
        };
    },
    computed: {
        user() {
            return store.state.user;
        }
    }
};
</script>
