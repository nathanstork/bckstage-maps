<script setup lang="ts">
import type { PropType } from "vue";

export interface ContextMenuItem {
    text: string;
    onClick: () => void;
    divider?: boolean; // Whether to render a divider after this menu item
}

const props = defineProps({
    items: {
        type: Array as PropType<ContextMenuItem[]>,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    onClose: {
        type: Function,
        required: false,
        default: () => {}
    }
});

const menuItemClick = (action: () => void) => {
    action();
    props.onClose();
};
</script>

<template>
    <ul
        class="position-fixed d-flex flex-column dropdown-menu dropdown-menu-dark"
        :style="{ left: `${props.x}px`, top: `${props.y}px` }"
        v-click-outside-element="props.onClose"
    >
        <template v-for="(item, index) in props.items" :key="`context-menu-item-${index}`">
            <li>
                <button class="dropdown-item" type="button" @click="menuItemClick(item.onClick)">
                    {{ item.text }}
                </button>
            </li>
            <li v-if="item.divider"><hr class="dropdown-divider" /></li>
        </template>
    </ul>
</template>
