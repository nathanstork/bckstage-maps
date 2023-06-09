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
const showLogoText = ref(false);
</script>

<template>
    <nav
        class="navbar fixed-top navbar-dark flex justify-content-between #333333 shadow px-2"
        style="z-index: 0"
    >
        <h4 class="navbar-text ms-2" style="margin-top: -2px">
            <span class="medium" style="margin-left: 150px">{{ props.title }}</span>
        </h4>

        <a
            class="position-absolute top-50 start-50 d-inline-block translate-middle d-none d-md-block mx-auto"
            href="/"
            @mouseover="showLogoText = true"
            @mouseout="showLogoText = false"
        >
            <img
                src="../assets/Bckstage_Rect_white klein.png"
                alt="Bckstagemaps logo"
                height="70"
            />

            <span
                class="logo-text"
                v-show="showLogoText"
                style="
                    position: absolute;
                    left: 70px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    background-color: #333333;
                "
            >
                BckstageMaps
            </span>
        </a>

        <button
            class="btn #333333 btn-small px-2"
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
