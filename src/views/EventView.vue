<script setup lang="ts">
import { onMounted, ref, toRaw, watch } from "vue";
import type { Ref } from "vue";
import { useEventQuery } from "@/queries/event";
import type { EventDto } from "@/queries/event";
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

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const mapLoaded = ref(false);

const eventQuery = useEventQuery(props.id);
const eventData = eventQuery.data as Ref<EventDto>;
const eventIsLoading = eventQuery.isLoading as Ref<boolean>;
const eventError = eventQuery.error as Ref<Error | null>;

const mapQuery = useMapQuery(props.id);
const mapData = mapQuery.data as Ref<string>;
const mapIsLoading = mapQuery.isLoading as Ref<boolean>;
const mapError = mapQuery.error as Ref<Error | null>;

const unitsQuery = useUnitsQuery(props.id);
const unitsData = unitsQuery.data as Ref<UnitDto[]>;
const unitsIsLoading = unitsQuery.isLoading as Ref<boolean>;
const unitsError = unitsQuery.error as Ref<Error | null>;

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
            const updatedUnits = currentUnits.filter((unit: UnitDto) => unit.id !== newUnit.id);
            updatedUnits.push(newUnit);
            store.commit("setUnits", updatedUnits);
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
        <div class="row">
            <div class="col-10">
                <LoadingView v-if="!eventData || !mapLoaded" />
                <EventMap
                    v-if="!mapIsLoading && mapData"
                    :map="mapData"
                    :units="store.getters.getUnits"
                    :onLoaded="setMapLoaded"
                />
            </div>
            <div class="col-2">
                <objectform :event_id="eventData.id" style="position: absolute" />
            </div>
        </div>
    </Layout>
</template>
