<script setup lang="ts">
import { UnitType } from "@/queries/units";
import type { UnitDto } from "@/queries/units";
import Moveable from "vue3-moveable";
import { ref, watch } from "vue";
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
</script>

<template>
    <div>
        <div
            ref="movableTarget"
            :class="
                'position-absolute' &&
                ((props.unit?.type === UnitType.CIRCLE && 'rounded-circle bg-danger') ||
                    (props.unit?.type === UnitType.SQUARE && 'rounded-circle bg-info') ||
                    (props.unit?.type === UnitType.TRIANGLE && 'rounded-circle bg-success') ||
                    (props.unit?.type === UnitType.POLYGON && 'rounded-circle bg-primary'))
            "
            :style="{
                transform: 'translate(' + x + 'px, ' + y + 'px)',
                width: '2rem',
                height: '2rem',
                zIndex: 100
            }"
        />
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
.unit {
    position: absolute;
    top: 150px;
    left: 100px;
    line-height: 100px;
    text-align: center;
    background: #ee8;
    color: #333;
    font-weight: bold;
    border: 1px solid #333;
    box-sizing: border-box;
}
</style>
