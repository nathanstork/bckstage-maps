<template>
    <button @click.prevent="Back" class="btn btn-close-white">Back</button>
    <div class="flex items-center h-full">
        <h1 class="text-2xl font-semibold">Create event</h1>
    </div>
    <div>
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
                    type="datetime-local"
                    id="ends_at"
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
                    type="datetime-local"
                    id="starts_at"
                    v-model="event.ends_at"
                    min=""
                    max=""
                    required
                />
            </div>

            <button @click.prevent="Save" class="btn btn-primary">Save</button>
        </form>
    </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
    data() {
        return {};
    },
    computed: {
        user() {
            return store.state.user;
        },
        event() {
            return store.state.event;
        }
    },
    methods: {
        Back() {
            router.push("event-overview");
        },
        Save() {
            if (
                this.event.name !== "" &&
                this.event.starts_at !== "" &&
                this.event.ends_at !== ""
            ) {
                store.dispatch("eventCreate");
            }
        }
    }
};
</script>
