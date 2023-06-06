<script setup lang="ts">
import { computed, toRaw, watch } from "vue";
import { useEventQuery } from "@/queries/event";
import store from "../store";
import router from "@/router";
import moment from "moment";
import { useMapMutation } from "@/mutations/map";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const event = computed(() => {
    return store.state.event;
});

const eventQuery = useEventQuery(props.id);

const { data, error, isLoading } = eventQuery;

const mapMutation = useMapMutation(props.id);

watch([data, error, isLoading], newValue => {
    store.state.event = toRaw(newValue[0]);
    store.state.event.starts_at = moment(String(store.state.event.starts_at)).format(
        "YYYY-MM-DDTkk:mm"
    );
    store.state.event.ends_at = moment(String(store.state.event.ends_at)).format(
        "YYYY-MM-DDTkk:mm"
    );
});

function Back() {
    router.push("/events");
}

function Save() {
    // if (
    //     this.event.name !== "" &&
    //     this.event.starts_at !== "" &&
    //     this.event.ends_at !== ""
    // ) {
    store.dispatch("eventUpdate");

    // Upload map, if a file is selected
    const mapFile = (document.getElementById("mapFile") as HTMLInputElement).files?.[0];

    if (!mapFile) return;

    mapMutation.mutate(mapFile);
    // }
}
</script>

<template>
    <div class="container" style="margin-top: 30px">
        <div class="row">
            <div class="col-12">
                <h1 class="text-2xl font-semibold" style="padding-bottom: 60px; text-align: center">
                    Edit event
                </h1>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-6">
                <form>
                    <div class="form-group" style="margin-bottom: 10px">
                        <label for="name">Event name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="Event name"
                            v-model="event.name"
                            required
                        />
                    </div>

                    <div
                        class="form-group pmd-textfield pmd-textfield-floating-label"
                        style="margin-bottom: 10px"
                    >
                        <label class="control-label">Start Date and Time</label>
                        <input
                            class="form-control"
                            type="datetime-local"
                            id="starts_at"
                            name="meeting-time"
                            v-model="event.starts_at"
                            min=""
                            max=""
                            required
                        />
                    </div>
                    <div
                        class="form-group pmd-textfield pmd-textfield-floating-label"
                        style="margin-bottom: 10px"
                    >
                        <label class="control-label">End Date and Time</label>
                        <input
                            class="form-control"
                            type="datetime-local"
                            id="ends_at"
                            v-model="event.ends_at"
                            min=""
                            max=""
                            required
                        />
                    </div>
                    <div
                        class="form-group pmd-textfield pmd-textfield-floating-label"
                        style="margin-bottom: 10px"
                    >
                        <label class="control-label">Map</label>
                        <div class="d-flex">
                            <input class="form-control" type="file" id="mapFile" />
                            <!--<button @click.prevent="upload" class="btn btn-sm btn-secondary ms-2">
                                Upload
                            </button>-->
                        </div>
                    </div>

                    <div class="form-group pt-4 text-center">
                        <button
                            @click.prevent="Back"
                            class="btn btn-outline-primary"
                            style="margin-right: 20px"
                        >
                            Back
                        </button>
                        <button @click.prevent="Save" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
