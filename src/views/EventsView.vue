<script setup>
import { useEventsQuery } from "@/queries/events";
import { computed, reactive, ref, toRaw, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import router from "@/router";
import { useQueryClient, useMutation } from "@tanstack/vue-query";
import { useStore } from "vuex";
import LogOut from "@/components/LogOut.vue";
import DialogModal from "@/components/DialogModal.vue";

const store = useStore();
store.dispatch("notAuthenticatedToHome");
const { data, error, isLoading } = useEventsQuery();
const user = computed(() => {
    return store.state.user;
});
const events = computed(() => {
    return store.state.events;
});
const showModal = ref(false);

watch([data, error, isLoading], newValue => {
    store.state.events = toRaw(newValue[0]["data"]);
});

const orderedEvents = computed(() => {
    const pastEvents = events.value.filter(event => {
        const endDate = new Date(event.ends_at);
        return endDate < new Date();
    });

    const futureEvents = events.value.filter(event => {
        const endDate = new Date(event.ends_at);
        return endDate >= new Date();
    });

    return [...futureEvents, ...pastEvents];
});

// mutation
// async function DeleteEvent(eventId) {
//   const {data, error} = await supabase.from("events").delete().match({id: eventId});
//   store.state.events = data;
//   useEventsQuery();
// }

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
        return await supabase.from("events").delete().eq("id", eventId);
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["events"] });
    }
});

function EventDelete(id) {
    mutation.mutate(id);
}

function formatDate(date) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
    };
    return new Date(date).toLocaleString([], options);
}

function getDotClass(event) {
    const now = new Date();
    const endDate = new Date(event.ends_at);

    if (endDate < now) {
        return "dot-red";
    } else {
        return "dot-green";
    }
}
</script>

<template>
    <div class="container">
        <div class="d-flex">
            <LogOut />
        </div>
        <div class="d-flex justify-content-between pt-5">
            <div class="col-3">
                <h1 class="text-2xl font-semibold" style="margin-left: 95px">Events</h1>
            </div>
            <div class="col-3">
                <button
                    @click.prevent="EventCreate"
                    class="btn btn-primary"
                    style="width: 130px; border: solid 2px black; margin-left: 48px"
                >
                    Add event
                </button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <table
                    class="table table-dark table-hover"
                    style="max-width: 1100px; margin: 0 auto"
                >
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Starts at</th>
                            <th scope="col">Ends at</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in orderedEvents" :key="event.id" style="cursor: pointer">
                            <td style="padding-right: 90px" @click.prevent="GoToEvent(event.id)">
                                {{ event.name }}
                            </td>
                            <td @click.prevent="GoToEvent(event.id)">
                                {{ formatDate(event.starts_at) }}
                            </td>
                            <td @click.prevent="GoToEvent(event.id)">
                                {{ formatDate(event.ends_at) }}
                                <span :class="getDotClass(event)"></span>
                            </td>
                            <td class="button-cell">
                                <div class="button-container">
                                    <button
                                        @click.prevent="EventUpdate(event.id)"
                                        class="btn btn-outline-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style="margin-left: 5px"
                                        @click.prevent="EventDelete(event.id)"
                                        class="btn btn-outline-primary"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
.button-cell {
    text-align: right;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
}

.dot-red {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
    margin-left: 5px;
}

.dot-green {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: green;
    border-radius: 50%;
    margin-left: 5px;
}
</style>
