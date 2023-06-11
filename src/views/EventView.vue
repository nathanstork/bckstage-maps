<script setup lang="ts">
import { ref } from "vue";
import { useEventQuery } from "@/queries/event";
import { useMapQuery } from "@/queries/map";
import Layout from "@/components/EventLayout.vue";
import LoadingView from "@/views/LoadingView.vue";
import EventMap from "@/components/EventMap.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import objectform from "@/components/ObjectForm.vue";
import { useStore } from "vuex";
import router from "@/router";
import { UnitType, useUnitsQuery } from "@/queries/units";

const store = useStore();
store.dispatch("notAuthenticatedToHome");
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

const unitsQuery = useUnitsQuery(props.id);
const { data: unitsData, isLoading: unitsIsLoading, error: unitsError } = unitsQuery;

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
        <div class="row">
            <div class="col-6">
                <LoadingView v-if="!eventData || !mapLoaded" />
                <EventMap
                    v-if="!mapIsLoading && mapData"
                    :map="mapData"
                    :units="unitsData"
                    :onLoaded="setMapLoaded"
                />
                <objectform :event_id="eventData.id" style="position: absolute"></objectform>
            </div>
        </div>
    </Layout>
</template>
