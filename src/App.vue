<template>
    <header>
        <router-link to="/" class="mr-4">
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        </router-link>
    </header>

    <main>
        <!--        <router-view />-->
        <LandingPage />
    </main>
</template>

<script>
import LandingPage from "./components/Landingspage.vue";

export default {
    name: "App",
    components: {
        LandingPage
    }
};
</script>

<style></style>
