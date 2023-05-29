<script setup>
import { ref } from "vue";
import DialogModal from "@/components/DialogModal.vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

const showModal = ref(false);
</script>

<template>
    <nav class="navbar fixed-top navbar-dark flex justify-content-between bg-dark shadow px-2">
        <h4 class="navbar-text ms-2">
            <span class="small">{{ props.title }}</span>
        </h4>

        <a
            class="position-absolute top-50 start-50 d-inline-block translate-middle d-none d-md-block mx-auto"
            href="/"
        >
            <img src="../assets/logobackstagemaps.svg" alt="Bckstagemaps logo" height="24" />
        </a>

        <button
            class="btn btn-dark btn-small px-2"
            @click="
                () => {
                    showModal = true;
                }
            "
        >
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>
    <DialogModal
        :show="showModal"
        title="Test"
        body="Test"
        :onCancel="
            () => {
                showModal = false;
            }
        "
    />
</template>
