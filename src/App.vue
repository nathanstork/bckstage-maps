<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <main>
        <router-view />
    </main>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
import { computed, onMounted } from "vue";
import CogIcon from "./components/GearSettings.vue";
import objectzone from "./components/ObjectForm.vue";
import EasyAdd from "@/components/EasyAdd.vue";
import { useStore } from "vuex";

export default {
    components: {
        CogIcon,
        EasyAdd,
        objectzone
    },
    setup() {
        const store = useStore();

        onMounted(async () => {
            const { data, error } = await supabase.auth.refreshSession();
            store.commit("setUser", data.user);
        });
    }
};
</script>

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
