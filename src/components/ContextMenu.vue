<script setup lang="ts">
import { ref, watch } from "vue";
import type { PropType } from "vue";

export interface ContextMenuItem {
    text: string;
    onClick: () => void;
    disabled?: boolean;
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

const menuRef = ref<HTMLElement>();

const x = ref<number>(props.x);
const y = ref<number>(props.y);

const menuItemClick = (action: () => void) => {
    action();
    props.onClose();
};

watch(
    () => [props.x, props.y, menuRef.value],
    newValue => {
        if (!menuRef.value) return;

        const newX = newValue[0] as number;
        const newY = newValue[1] as number;

        // Prevent context menu from going off-screen
        if (newX + menuRef.value?.getBoundingClientRect().width > window.innerWidth) {
            newValue[0] = window.innerWidth - menuRef.value?.getBoundingClientRect().width;
        }
        if (newY + menuRef.value?.getBoundingClientRect().height > window.innerHeight) {
            newValue[1] = window.innerHeight - menuRef.value?.getBoundingClientRect().height;
        }

        x.value = newValue[0] as number;
        y.value = newValue[1] as number;
    }
);
</script>

<template>
    <ul
        ref="menuRef"
        class="position-fixed d-flex flex-column dropdown-menu dropdown-menu-dark"
        :style="{ left: `${x}px`, top: `${y}px` }"
        v-click-outside-element="props.onClose"
    >
        <template v-for="(item, index) in props.items" :key="`context-menu-item-${index}`">
            <li>
                <button
                    class="dropdown-item"
                    type="button"
                    :disabled="item.disabled"
                    @click="menuItemClick(item.onClick)"
                >
                    {{ item.text }}
                </button>
            </li>
            <li v-if="item.divider"><hr class="dropdown-divider" /></li>
        </template>
    </ul>
</template>
