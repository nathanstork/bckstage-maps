<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    },
    onConfirm: {
        type: Function,
        required: false
    },
    onCancel: {
        type: Function,
        required: false
    }
});
</script>

<template>
    <transition name="fade" appear>
        <div v-if="props.show" class="d-block modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark" style="z-index: 1050">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">{{ props.title }}</h5>
                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            aria-label="Close"
                            @click="props.onCancel"
                        />
                    </div>
                    <div class="modal-body">
                        <p v-if="props.body">{{ props.body }}</p>
                        <slot />
                    </div>
                    <div class="modal-footer border-secondary">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                            @click="props.onCancel"
                        >
                            Cancel
                        </button>
                        <button type="button" class="btn btn-primary" @click="props.onConfirm">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
            <!-- Backdrop -->
            <div
                v-if="show"
                class="fixed-top min-vw-100 min-vh-100"
                style="background-color: black; opacity: 0.5; z-index: 1040"
            />
        </div>
    </transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
