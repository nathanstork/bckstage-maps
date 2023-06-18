<script setup lang="ts">
import { UnitType } from "@/queries/units";
import type { UnitDto } from "@/queries/units";
import Moveable from "vue3-moveable";
import { ref, watch, computed } from "vue";
import type { PropType } from "vue";
import { useUnitMutation } from "@/mutations/unit";

const props = defineProps({
    unit: {
        type: Object as PropType<UnitDto>,
        required: true
    }
});

const unitMutation = useUnitMutation(props.unit.id);

const movableTarget = ref(null);

const x = ref(props.unit.x);
const y = ref(props.unit.y);

const updates = ref<{ x: number; y: number }[]>([]);

const log = (e: any) => {
    console.log(e);
};

// Add new coordinates to the updates array
watch([x, y], newValue => {
    updates.value.push({
        x: newValue[0],
        y: newValue[1]
    });
});

// Attempt an update every two seconds
setInterval(() => {
    if (updates.value.length === 0) return;

    const updatesSnapshot = [...updates.value];

    // Remove all outdated updates
    updates.value = updates.value.filter(item => !updatesSnapshot.includes(item));

    const update = updatesSnapshot.pop();

    if (!update) return;

    unitMutation.mutate({
        x: update.x,
        y: update.y
    });
}, 2000);

const showTooltip = ref(false);
</script>

<template>
    <div>
        <div
            ref="movableTarget"
            :class="
                'position-absolute' &&
                ((props.unit?.type === UnitType.CIRCLE && 'rounded-circle') ||
                    (props.unit?.type === UnitType.SQUARE && 'square') ||
                    (props.unit?.type === UnitType.TRIANGLE && 'triangle-shape') ||
                    (props.unit?.type === UnitType.POLYGON && 'polygon-shape'))
            "
            :style="{
                transform: 'translate(' + x + 'px, ' + y + 'px)',
                width: props.unit?.type === UnitType.TRIANGLE ? '0' : '1.5rem',
                height: props.unit?.type === UnitType.TRIANGLE ? '0' : '1.5rem',
                borderLeft:
                    props.unit?.type === UnitType.TRIANGLE ? '0.75rem solid transparent' : 'none',
                borderRight:
                    props.unit?.type === UnitType.TRIANGLE ? '0.75rem solid transparent' : 'none',
                borderBottom:
                    props.unit?.type === UnitType.TRIANGLE ? '1.5rem solid #FF00DF' : 'none',
                zIndex: 100,
                backgroundColor:
                    (props.unit?.type === UnitType.CIRCLE && '#FFA500') ||
                    (props.unit?.type === UnitType.SQUARE && '#00FFFF') ||
                    (props.unit?.type === UnitType.POLYGON && '#00FF77') ||
                    ''
            }"
            @mouseover="showTooltip = true"
            @mouseout="showTooltip = false"
        >
            <div
                v-if="showTooltip"
                style="
                    width: 70px;
                    top: -29px;
                    color: white;
                    font-weight: bold;
                    background-color: black;
                    padding: 2px;
                    border-radius: 5px;
                "
            >
                {{ props.unit.name }}
            </div>
        </div>
        <Moveable
            :target="movableTarget"
            :draggable="true"
            :stopPropagation="true"
            @drag="
                e => {
                    e.target.style.transform = e.transform;
                    x = e.translate[0];
                    y = e.translate[1];
                }
            "
        />
    </div>
</template>

<style>
.polygon-shape {
    clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    background-color: #00ff77;
}
</style>
