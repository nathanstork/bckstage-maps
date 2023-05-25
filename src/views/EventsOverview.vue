<script setup>
import { useEventsQuery } from "@/queries/events";
import { computed, toRaw, watch } from "vue";
import store from "@/store";
import { supabase } from "@/lib/supabaseClient";
import router from "@/router";
import { useQueryClient, useQuery, useMutation } from "vue-query";

const { data, error, isLoading } = useEventsQuery();
const user = computed(() => {
    return store.state.user;
});
const events = computed(() => {
    return store.state.events;
});

watch([data, error, isLoading], newValue => {
    store.state.events = toRaw(newValue[0]["data"]);
});

// mutation
async function DeleteEvent(eventId) {
    const { data, error } = await supabase.from("events").delete().match({ id: eventId });
    store.state.events = data;
    useEventsQuery();
}

function GoToEvent(id) {
    router.push("event/" + id);
}

function EventUpdate(id) {
    router.push("/event/" + id + "/edit");
}

function EventCreate() {
    router.push("event-create");
}

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: async eventId => {
        console.log(eventId);
        return await supabase.from("events").delete().eq("id", eventId);
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["events"] });
    }
});

function onButtonClick(id) {
    mutation.mutate(id);
}
</script>
<template>
    <div class="container pt-5">
        <div class="flex items-center h-full">
            <div class="row justify-content-between">
                <div class="col-3">
                    <h1 class="text-2xl font-semibold">Events</h1>
                </div>
                <div class="col-3">
                    <button @click.prevent="EventCreate" class="btn btn-outline-primary">
                        Add event
                    </button>
                </div>
            </div>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Starts at</th>
                        <th scope="col">Ends at</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" style="cursor: pointer">
                        <td @click.prevent="GoToEvent(event.id)">{{ event.name }}</td>
                        <td @click.prevent="GoToEvent(event.id)">
                            <date-format :date="event.starts_at" has-time />
                        </td>
                        <td @click.prevent="GoToEvent(event.id)">
                            <date-format :date="event.ends_at" has-time />
                        </td>
                        <td>
                            <button
                                @click.prevent="EventUpdate(event.id)"
                                class="btn btn-outline-primary"
                            >
                                Edit
                            </button>
                            <button
                                @click.prevent="onButtonClick(event.id)"
                                class="btn btn-outline-primary"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
