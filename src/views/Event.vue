<script setup></script>

<template>
    <div class="flex items-center h-full">
        <h1 class="text-2xl font-semibold">Event - {{ id }}</h1>
    </div>
</template>

<script>
export default {
    props: ["id"]
};
</script>
