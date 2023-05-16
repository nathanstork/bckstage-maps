<template>
    <button @click.prevent="EventCreate" class="btn btn-close-white">Add event</button>
    <div class="flex items-center h-full">
        <h1 class="text-2xl font-semibold">Events</h1>
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Starts at</th>
                    <th scope="col">Ends at</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in this.events">
                    <td>{{ event.name }}</td>
                    <td>{{ event.starts_at }}</td>
                    <td>{{ event.ends_at }}</td>
                    <td>
                        <button
                            @click.prevent="DeleteEvent(event.id)"
                            class="btn btn-outline-primary"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
import { onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";

export default {
    setup() {
        onMounted(async () => {
            const { data, error } = await supabase.from("events").select();
            store.state.events = data;
        });
    },
    computed: {
        user() {
            return store.state.user;
        },
        events() {
            return store.state.events;
        }
    },
    methods: {
        EventCreate() {
            router.push("event-create");
        },
        async DeleteEvent(eventId) {
            const { data, error } = await supabase.from("events").delete().match({ id: eventId });
        }
    }
};
</script>
