<script setup>
import Navbar from "@/components/EventToolbar.vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<template>
    <Navbar :title="props.title" />
    <div class="min-vw-100 min-vh-100">
        <slot />
    </div>
</template>
