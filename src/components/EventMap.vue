<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import Panzoom, { PanZoom } from "panzoom";
// Ignore type errors for import as @tato/vue-pdf is not typed
// @ts-ignore
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import ContextMenu from "@/components/ContextMenu.vue";
import type { ContextMenuItem } from "@/components/ContextMenu.vue";

const props = defineProps({
    onLoaded: {
        type: Function,
        required: false,
        default: () => {}
    }
});

const boundsPadding = 5;

const panzoom = ref<PanZoom>();
const panzoomContent = ref<HTMLElement>();

const lockMap = ref(false);

const showContextMenu = ref(false);
const contextMenuLocation = reactive({
    x: 0,
    y: 0
});

const contextMenuLockItem = ref<ContextMenuItem>({
    text: "Lock map",
    onClick: () => {
        lockMap.value = !lockMap.value;
        contextMenuLockItem.value.text = lockMap.value ? "Unlock map" : "Lock map";
    },
    divider: true
});

const contextMenuItems: ContextMenuItem[] = [
    {
        text: "Center map",
        onClick: () => {
            console.log("Center map"); // TODO
        }
    },
    contextMenuLockItem.value,
    {
        text: "Reset zoom",
        onClick: () => {
            console.log("Reset zoom"); // TODO
        }
    }
];

const { pdf } = usePDF(
    "https://gudxawknwihalccacopu.supabase.co/storage/v1/object/public/maps/HJ2019%20terreintekening%20versie1.9%20all%20.pdf"
);
const rotation = ref(-90); // Only applicable for this hardcoded PDF file

const onPdfLoaded = () => {
    if (panzoomContent.value)
        panzoom.value = Panzoom(panzoomContent.value, {
            autocenter: true,
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

    props.onLoaded();
};

const onContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const { clientX, clientY } = event;

    contextMenuLocation.x = clientX;
    contextMenuLocation.y = clientY;

    showContextMenu.value = true;
};

const onContextMenuClose = () => {
    showContextMenu.value = false;
};

watch(lockMap, newValue => {
    if (newValue) panzoom.value?.pause();
    else panzoom.value?.resume();
});
</script>

<template>
    <div
        id="panzoomContainer"
        class="overflow-hidden min-vw-100 min-vh-100 bg-dark"
        @contextmenu="onContextMenu"
    >
        <div ref="panzoomContent" class="d-inline-block">
            <VuePDF
                class="d-inline-block"
                :pdf="pdf"
                :page="1"
                :rotation="rotation"
                :text-layer="false"
                @loaded="onPdfLoaded"
            />
        </div>
    </div>
    <ContextMenu
        v-if="showContextMenu"
        :items="contextMenuItems"
        :x="contextMenuLocation.x"
        :y="contextMenuLocation.y"
        :on-close="onContextMenuClose"
    />
</template>
