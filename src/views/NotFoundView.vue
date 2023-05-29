<script setup>
import { defineProps } from "vue";

const props = defineProps({
    message: {
        type: String,
        required: false,
        default: "Not found"
    }
});
</script>

<template>
    <div class="d-flex h-100">
        <h1 class="text-2xl font-semibold">404 - {{ props.message }}</h1>
    </div>
</template>
