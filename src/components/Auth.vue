<template>
    <button @click.prevent="signIn" class="btn btn-close-white">Github</button>
    <!--  google, apple-->
    {{ user }}
</template>

<script>
import store from "@/store";

export default {
    setup() {
        const userEmail = store.state.user;

        const signIn = () => {
            store.dispatch("signInAction");
        };
        return {
            signIn,
            userEmail
        };
    },
    computed: {
        user() {
            return store.state.user;
        }
    }
};
</script>
