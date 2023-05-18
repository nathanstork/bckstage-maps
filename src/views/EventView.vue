<script setup lang="ts">
import { reactive, watch } from "vue";
import { useEventQuery } from "@/queries/event";
import Layout from "@/components/EventLayout.vue";
import EventMap from "@/components/EventMap.vue";
import LoadingView from "@/views/LoadingView.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const localStore = reactive({
    mapLoaded: false
});

const eventQuery = useEventQuery(props.id);

const { data, error, isLoading } = eventQuery;

const setMapLoaded = () => {
    localStore.mapLoaded = true;
};

watch([data, error, isLoading], (newValue, oldValue) => {
    if (!isLoading) console.log(newValue, oldValue);
});
</script>

<template>
    <Layout :title="props.id">
        <LoadingView v-if="isLoading || !localStore.mapLoaded" />
        <EventMap :afterInit="setMapLoaded" />
    </Layout>
</template>
