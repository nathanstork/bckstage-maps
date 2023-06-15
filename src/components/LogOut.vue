<template>
    <button
        v-if="isLoggedIn()"
        @click.prevent="signOut()"
        class="btn btn-outline-primary"
        style="margin: 10px 0px 0px 10px; width: 140px; z-index: 5"
    >
        Log out
    </button>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const signOut = () => {
    store.dispatch("signOutAction");
};

const isLoggedIn = () => {
    return store.getters.getUser !== null;
};
</script>
