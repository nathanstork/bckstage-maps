<script setup>
import Toolbar from "@/components/EventToolbar.vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<template>
    <Toolbar :title="props.title" />
    <div class="min-vw-100 min-vh-100">
        <slot />
    </div>
</template>
