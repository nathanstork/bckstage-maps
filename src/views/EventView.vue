<script>
import { defineComponent } from "vue";
import EventMap from "@/components/EventMap.vue";

export default defineComponent({
    props: ["id"],
    components: { EventMap }
});
</script>

<template>
    <div class="flex items-center h-full">
        <h1 class="text-2xl font-semibold p-4">Event - {{ id }}</h1>
        <EventMap />
    </div>
</template>
