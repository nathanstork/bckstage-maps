<script setup lang="ts">
import { ref } from "vue";
import { useEventQuery } from "@/queries/event";
import { useMapQuery } from "@/queries/map";
import Layout from "@/components/EventLayout.vue";
import LoadingView from "@/views/LoadingView.vue";
import EventMap from "@/components/EventMap.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const mapLoaded = ref(false);

const eventQuery = useEventQuery(props.id);
const { data: eventData, isLoading: eventIsLoading, error: eventError } = eventQuery;

const mapQuery = useMapQuery(props.id);
const { data: mapData, isLoading: mapIsLoading, error: mapError } = mapQuery;

const setMapLoaded = () => (mapLoaded.value = true);
</script>

<template>
    <div
        v-if="eventError || mapError"
        class="d-flex justify-content-center align-items-center min-vw-100 min-vh-100"
    >
        <NotFoundView message="Event not found" />
    </div>
    <Layout
        v-if="!eventIsLoading && eventData && !(eventError || mapError)"
        :title="eventData.name"
    >
        <LoadingView v-if="!eventData || !mapLoaded" />
        <EventMap v-if="!mapIsLoading && mapData" :map="mapData" :onLoaded="setMapLoaded" />
    </Layout>
</template>
