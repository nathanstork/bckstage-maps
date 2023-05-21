<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-7 bg-primary">
                <div class="headtext">
                    <h1 class="display-2 fade-in">The all-in-one</h1>
                    <p class="lead fade-in">control room solution</p>
                    <p class="lead1 fade-in">for your events.</p>
                </div>
                <div class="image-container">
                    <img src="src/assets/10077.png" alt="BckstageMaps" />
                </div>
            </div>
            <div class="col" style="animation: fadeInAnimation 1.2s ease-in forwards; opacity: 0">
                <div class="titletext">
                    <h1
                        class="display-4"
                        style="font-weight: bold; font-size: 5rem; top: 5rem; text-align: center"
                    >
                        BckstageMaps
                    </h1>
                </div>
                <div class="buttons mt-5">
                    <button
                        class="btn btn-primary btn-lg"
                        style="background-color: #212528; font-size: 1.2rem"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="35"
                            height="35"
                            fill="currentColor"
                            class="bi bi-github"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                            />
                        </svg>
                        Sign in with GitHub
                    </button>
                    <br />
                    <br />
                    <button
                        class="btn btn-primary btn-lg"
                        style="background-color: #3c7eee; font-size: 1.2rem"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="35"
                            fill="currentColor"
                            class="bi bi-google"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                            />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
                <div class="inputfield mt-5" style="width: 250px">
                    <input
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Enter Event ID..."
                        style="font-size: 1.5rem"
                    />
                    <br />
                    <br />
                    <button
                        class="btn btn-secondary btn-lg"
                        style="
                            width: 150px;
                            margin-top: -20px;
                            background-color: #0096ff;
                            font-size: 1.5rem;
                        "
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

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

.headtext h1 {
    font-size: 5rem;
    text-align: center;
    margin-right: 15rem;
    font-weight: bold;
    top: 5rem;
    animation: fadeInAnimation 0.8s ease-in forwards;
    opacity: 0;
}

.headtext p {
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    top: 8rem;
    animation: fadeInAnimation 1.8s ease-in forwards;
    opacity: 0;
}

.lead {
    right: 3rem;
    margin-top: -2rem;
}

.lead1 {
    left: 10.5rem;
    margin-top: -1rem;
}

.buttons {
    text-align: center;
    top: 6.5rem;
}

.inputfield {
    text-align: center;
    top: 7rem;
    left: 12.5rem;
}

.image-container img {
    width: 500px;
    top: 8rem;
    left: 7rem;
    animation: fadeInAnimation 2s ease-in forwards;
    opacity: 0;
}
</style>

<script></script>

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

<!-- <Auth>
    {{ user }}
</Auth> -->
