<script setup lang="ts">
import { computed, toRaw, watch } from "vue";
import { useEventQuery } from "@/queries/event";
import store from "../store";
import router from "@/router";
import moment from "moment";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const user = computed(() => {
    return store.state.user;
});
const event = computed(() => {
    return store.state.event;
});

const eventQuery = useEventQuery(props.id);

const { data, error, isLoading } = eventQuery;

watch([data, error, isLoading], newValue => {
    // console.log(newValue[0]['data']);
    store.state.event = toRaw(newValue[0]["data"]);
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
    // }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <h1 class="text-2xl font-semibold">Edit event</h1>
                <button @click.prevent="Back" class="btn btn-outline-primary">Back</button>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <form>
                    <div class="form-group">
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

                    <div class="form-group pmd-textfield pmd-textfield-floating-label">
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
                    <div class="form-group pmd-textfield pmd-textfield-floating-label">
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

                    <div class="form-group pt-4">
                        <button @click.prevent="Save" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
