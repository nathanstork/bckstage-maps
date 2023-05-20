<script setup lang="ts">
import { ref, watch } from "vue";
import { useEventQuery } from "@/queries/event";
import Layout from "@/components/EventLayout.vue";
import LoadingView from "@/views/LoadingView.vue";
import EventMap from "@/components/EventMap.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const mapLoaded = ref(false);

const eventQuery = useEventQuery(props.id);

const { data, error, isLoading } = eventQuery;

const setMapLoaded = () => (mapLoaded.value = true);

watch([data, error, isLoading], (newValue, oldValue) => {
    if (!isLoading) console.log(newValue, oldValue);
});
</script>

<template>
    <Layout :title="props.id">
        <LoadingView v-if="isLoading || !mapLoaded" />
        <EventMap :onLoaded="setMapLoaded" />
    </Layout>
</template>
