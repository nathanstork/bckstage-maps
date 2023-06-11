<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import Panzoom, { PanZoom } from "panzoom";
// Ignore type errors for import as @tato/vue-pdf is not typed
// @ts-ignore
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import ContextMenu from "@/components/ContextMenu.vue";
import type { ContextMenuItem } from "@/components/ContextMenu.vue";
import type { UnitDto } from "@/queries/units";
import EventUnit from "@/components/EventUnit.vue";

const props = defineProps({
    map: {
        type: String,
        required: true
    },
    units: {
        type: Array<UnitDto>,
        required: true
    },
    onLoaded: {
        type: Function,
        required: false,
        default: () => {}
    }
});

const boundsPadding = 5;

const componentKey = ref(0);

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
            console.log("Center map"); // TODO: Implement map centering

            //const panzoomContent.value?.getBoundingClientRect();

            /*var w; // width of the parent
            var h; // height of the parent
            var left = 0;
            var top = 0;
            var sceneBoundingBox = getBoundingBox();
            if (sceneBoundingBox) {
                // If we have bounding box - use it.
                left = sceneBoundingBox.left;
                top = sceneBoundingBox.top;
                w = sceneBoundingBox.right - sceneBoundingBox.left;
                h = sceneBoundingBox.bottom - sceneBoundingBox.top;
            } else {
                // otherwise just use whatever space we have
                var ownerRect = owner.getBoundingClientRect();
                w = ownerRect.width;
                h = ownerRect.height;
            }
            var bbox = panController.getBBox();
            if (bbox.width === 0 || bbox.height === 0) {
                // we probably do not have any elements in the SVG
                // just bail out;
                return;
            }
            var dh = h / bbox.height;
            var dw = w / bbox.width;
            var scale = Math.min(dw, dh);
            transform.x = -(bbox.left + bbox.width / 2) * scale + w / 2 + left;
            transform.y = -(bbox.top + bbox.height / 2) * scale + h / 2 + top;
            transform.scale = scale;*/
        },
        disabled: true
    },
    contextMenuLockItem.value,
    {
        text: "Reset map",
        onClick: () => {
            componentKey.value++; // Unmount and remount component by changing the key
        }
    }
];

const { pdf } = usePDF(props.map);
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
                top: boundsPadding + 70,
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
        :key="componentKey"
        id="panzoomContainer"
        class="overflow-hidden min-vw-80 min-vh-100 bg-dark"
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
            <EventUnit v-for="unit in props.units" :key="unit.id" :unit="unit" />
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
