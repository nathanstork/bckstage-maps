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

const x = ref(0);
const y = ref(0);

watch(x, (newValue, oldValue) => {
    unitMutation.mutate({
        ...props.unit,
        x: newValue
    });
    console.log("x changed from " + oldValue + " to " + newValue);
});

watch(y, (newValue, oldValue) => {
    unitMutation.mutate({
        ...props.unit,
        y: newValue
    });
    console.log("y changed from " + oldValue + " to " + newValue);
});
</script>

<template>
    <div
        ref="movableTarget"
        :class="
            (props.unit?.type === UnitType.CIRCLE &&
                'position-absolute rounded-circle bg-danger') ||
            (props.unit?.type === UnitType.SQUARE && 'position-absolute rounded-circle bg-info') ||
            (props.unit?.type === UnitType.TRIANGLE &&
                'position-absolute rounded-circle bg-success') ||
            (props.unit?.type === UnitType.POLYGON && 'position-absolute rounded-circle bg-primary')
        "
        :style="{
            top: props.unit?.y + 'px',
            left: props.unit?.x + 'px',
            width: '2rem',
            height: '2rem',
            zIndex: 1000
        }"
    />
    <Moveable
        :target="movableTarget"
        :draggable="true"
        :stopPropagation="true"
        @drag="
            e => {
                e.target.style.transform = e.transform;
                x = e.left;
                y = e.top;
            }
        "
    />
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
