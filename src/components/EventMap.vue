<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import Panzoom from "panzoom";
import { PanZoom } from "panzoom";
// Ignore type errors for import as @tato/vue-pdf is not typed
// @ts-ignore
import { VuePDF, usePDF } from "@tato30/vue-pdf";

const initialZoom = 0.5;
const boundsPadding = 5;

const { pdf } = usePDF(
    "https://gudxawknwihalccacopu.supabase.co/storage/v1/object/public/maps/HJ2019%20terreintekening%20versie1.9%20all%20.pdf"
);
const rotation = ref(-90); // Only applicable for this hardcoded PDF file

const panzoom = ref<PanZoom>();
const panzoomContent = ref<HTMLElement>();

const props = defineProps({
    afterInit: {
        type: Function,
        required: false,
        default: () => {}
    }
});

const defaultTransform = reactive({
    x: 0,
    y: 0
});

const pdfLoaded = () => {
    if (!panzoomContent.value) return;

    defaultTransform.x =
        document.documentElement.clientWidth / 2 -
        (panzoomContent.value.clientWidth / 2) * initialZoom;

    defaultTransform.y =
        document.documentElement.clientHeight / 2 -
        (panzoomContent.value.clientHeight / 2) * initialZoom;
};

onMounted(() => {
    if (panzoomContent.value)
        panzoom.value = Panzoom(panzoomContent.value, {
            initialZoom,
            zoomSpeed: 0.065,
            minZoom: 0.25,
            maxZoom: 3,
            bounds: {
                left: boundsPadding,
                top: boundsPadding + 68,
                right: document.documentElement.clientWidth - boundsPadding,
                bottom: document.documentElement.clientHeight - boundsPadding
            }
        });
});

watch(
    () => [defaultTransform.x, defaultTransform.y],
    newTransform => {
        if (panzoom.value) panzoom.value?.moveTo(newTransform[0], newTransform[1]);
        props.afterInit();
    }
);
</script>

<template>
    <div id="panzoomContainer" class="overflow-hidden min-vw-100 min-vh-100">
        <div ref="panzoomContent" class="d-inline-block">
            <VuePDF
                class="d-inline-block"
                :pdf="pdf"
                :page="1"
                :rotation="rotation"
                :text-layer="false"
                @loaded="pdfLoaded"
            />
        </div>
    </div>
</template>

<style>
#panzoomContainer {
    background-color: #183238;
}
</style>
