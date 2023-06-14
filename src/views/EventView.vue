<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from "vue";
import { useEventQuery } from "@/queries/event";
import { useMapQuery } from "@/queries/map";
import Layout from "@/components/EventLayout.vue";
import LoadingView from "@/views/LoadingView.vue";
import EventMap from "@/components/EventMap.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import objectform from "@/components/ObjectForm.vue";
import { useStore } from "vuex";
import { useUnitsQuery } from "@/queries/units";
import type { UnitDto } from "@/queries/units";
import { supabase } from "@/lib/supabaseClient";

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

onMounted(() => {
    if (toRaw(unitsData.value) && !toRaw(unitsIsLoading.value))
        store.commit("setUnits", toRaw(unitsData.value));
});

watch([unitsData, unitsIsLoading, unitsError], () => {
    if (toRaw(unitsData.value) && !toRaw(unitsIsLoading.value) && !toRaw(unitsError.value))
        store.commit("setUnits", toRaw(unitsData.value));
});

supabase
    .channel(props.id)
    .on("postgres_changes", { event: "*", schema: "public", table: "units" }, payload => {
        const currentUnits = toRaw(store.getters.getUnits) as UnitDto[];
        const newUnit = payload.new as UnitDto;

        if (payload.eventType === "INSERT") {
            // Add new unit to store
            store.commit("setUnits", [...currentUnits, newUnit]);
        }

        if (payload.eventType === "UPDATE") {
            // Update unit in store
            const updatedUnit = currentUnits.find((unit: UnitDto) => unit.id === newUnit.id);
            if (updatedUnit) {
                currentUnits[currentUnits.indexOf(updatedUnit)] = newUnit;
                store.commit("setUnits", currentUnits);
            }
        }
    })
    .subscribe();
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
        <div class="row" style="margin-top: 15px">
            <div class="col-10">
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
