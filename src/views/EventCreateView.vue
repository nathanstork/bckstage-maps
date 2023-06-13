<template>
    <div class="container" style="margin-top: 30px">
        <div class="row">
            <div class="col-12">
                <h1 class="text-2xl font-semibold" style="padding-bottom: 60px; text-align: center">
                    Create event
                </h1>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-6">
                <form>
                    <div class="form-group" style="margin-bottom: 10px">
                        <label for="name text-left">Event name</label>
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
                            id="ends_at"
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
                            id="starts_at"
                            v-model="event.ends_at"
                            min=""
                            max=""
                            required
                        />
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

<script>
import store from "@/store";
import router from "@/router";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        store.dispatch("notAuthenticatedToHome");
    },
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
            router.push("/events");
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
    },
    mounted() {
        this.event.name = "";
        this.event.starts_at = "";
        this.event.ends_at = "";
    }
};
</script>
