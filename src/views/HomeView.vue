<template>
    {{ user }}
    <div class="container-fluid">
        <div class="row">
            <div class="col-7 bg-primary">
                <div class="headtext">
                    <h1 class="display-2 fade-in">The all-in-one</h1>
                    <p class="lead fade-in">control room solution</p>
                    <p class="lead1 fade-in">for</p>
                    <p class="lead2 fade-in">{{ word }}</p>
                </div>
                <div class="image-container">
                    <img src="src/assets/10077.png" alt="BckstageMaps" />
                </div>
            </div>
            <div
                class="col"
                style="animation: fadeInAnimation 1.2s ease-in forwards; opacity: 0; top: 5rem"
            >
                <div class="titletext">
                    <h1
                        class="display-4"
                        style="font-weight: bold; font-size: 3.5rem; top: 5rem; text-align: center"
                    >
                        BckstageMaps
                    </h1>
                </div>

                <div class="buttons mt-5">
                    <AuthForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
    components: {
        AuthForm: AuthForm
    },
    setup() {
        const store = useStore();
        store.dispatch("fetchUser");

        store.dispatch("authenticatedToEvents");

        const words = ref(["festivals", "events", "competitions"]);
        const wordIndex = ref(0);
        const word = ref(words.value[wordIndex.value]);

        const changeWord = () => {
            wordIndex.value = (wordIndex.value + 1) % words.value.length;
            word.value = words.value[wordIndex.value];
        };

        setInterval(changeWord, 2000);

        return {
            word
        };
    }
};
</script>

<style>
.container-fluid {
    padding: 0;
    height: 100vh;
}

.row {
    margin: 0;
    height: 100%;
}

.col {
    padding: 0;
    height: 100%;
}

.bg-primary {
    background-color: #0096ff;
    height: 100%;
}

@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.headtext h1,
.headtext p {
    text-align: center;
    font-weight: bold;
    animation: fadeInAnimation 1.8s ease-in forwards;
}

.display-2 {
    right: 9rem;
    font-size: 5rem;
    margin-top: 5rem;
}

.lead {
    right: 1rem;
    margin-top: -1rem;
    font-size: 4rem;
}

.lead1 {
    right: 12rem;
    margin-top: -1rem;
    font-size: 4rem;
}

.lead2 {
    left: 7.5rem;
    margin-top: -8.5rem;
    font-size: 5rem;
    color: #fadb28;
}

.buttons {
    text-align: center;
    top: 6.5rem;
}

.image-container img {
    width: 500px;
    left: 10rem;
    animation: fadeInAnimation 2s ease-in forwards;
    opacity: 0;
}
</style>
