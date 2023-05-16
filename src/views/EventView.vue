<script setup lang="ts">
import { watch } from "vue";
import { useEventQuery } from "@/queries/event";
import EventMap from "@/components/EventMap.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const eventQuery = useEventQuery(props.id);

const { data, error, isLoading } = eventQuery;

watch([data, error, isLoading], (newValue, oldValue) => {
    console.log(newValue, oldValue);
});
</script>

<template>
    <div class="flex items-center h-full">
        <h1 class="text-2xl font-semibold p-4">Event - {{ id }}</h1>
        <EventMap />
    </div>
</template>
