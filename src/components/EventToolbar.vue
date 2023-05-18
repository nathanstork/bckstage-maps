<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<template>
    <nav class="navbar fixed-top navbar-dark flex justify-content-between bg-dark shadow px-2">
        <h4 class="navbar-text ms-2">
            <span class="small">{{ props.title }}</span>
        </h4>

        <a
            class="position-absolute top-50 start-50 translate-middle d-none d-md-block mx-auto"
            href="/"
        >
            <div class="image-container">
                <img src="../assets/logobackstagemaps.svg" alt="Bckstagemaps logo" height="24" />
            </div>
        </a>

        <button class="btn btn-dark btn-small">
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>
</template>
