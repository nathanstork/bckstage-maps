<template>
    <div class="wrapper">
        <div class="table-container" :style="isTableExpanded ? 'height: 190px' : 'height: 70vh'">
            <table class="table table-bordered table-striped">
                <thead class="sticky-top" style="background-color: #333333">
                    <tr class="text-center">
                        <th class="border-2 p-2 text-center">
                            <div class="objecttext" style="color: white; margin-bottom: -10px">
                                <h2>Units</h2>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, itemIndex) in filteredItems.slice().reverse()"
                        :key="itemIndex"
                        :style="{ backgroundColor: item.color }"
                        class="text-center"
                        @contextmenu.prevent="deleteItem(itemIndex, $event)"
                        draggable="true"
                    >
                        <td
                            class="border-2 p-2 text-center"
                            :style="{ backgroundColor: item.color }"
                        >
                            <input
                                type="text"
                                v-model="item.object"
                                style="width: 150px; font-size: 15px"
                                class="text-center form-control"
                                disabled
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--    <div class="current-time">-->
        <!--        <p style="font-size: 22px; font-weight: bold">{{ currentTime }}</p>-->
        <!--    </div>-->
        <div class="buttons" v-if="!isTableExpanded" style="margin-top: -70px">
            <button
                type="button"
                class="btn btn-ehbo"
                @click="addItemWithColor('EHBO', '#FFA500', 'circle', props.event_id)"
            >
                EHBO
            </button>
            <button
                type="button"
                class="btn btn-als"
                @click="addItemWithColor('ALS', '#FF00DF', 'triangle', props.event_id)"
            >
                ALS
            </button>
            <button
                type="button"
                class="btn btn-ibt"
                @click="addItemWithColor('IBT', '#00FFFF', 'square', props.event_id)"
            >
                IBT
            </button>
            <button
                type="button"
                class="btn btn-custom"
                data-bs-toggle="collapse"
                data-bs-target="#customscreen"
                aria-expanded="false"
                aria-controls="customscreen"
            >
                Custom [+]
            </button>
            <div class="collapse collapse-up" id="customscreen" ref="customscreen">
                <div class="customscreen bg-dark text-light" ref="customscreen">
                    <div class="mb-3">
                        <label for="object-input" class="form-label">Object:</label>
                        <input
                            class="form-control"
                            type="text"
                            id="object-input"
                            v-model="state.newObject.object"
                            @keypress="handleKeyPress"
                        />
                    </div>
                    <div class="mb-3">
                        <label
                            class="d-block text-center mb-2 text-light"
                            :style="{
                                color: 'black',
                                width: '187px',
                                margin: '0 auto',
                                textAlign: 'center'
                            }"
                            >{{ state.newObject.object }}</label
                        >
                    </div>
                    <div class="mb-3">
                        <button
                            class="btn btn-primary d-block mx-auto"
                            style="background-color: #0096ff; margin-top: 30px; padding: "
                            @click="addItemWithCustomColor"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, defineProps, onUnmounted } from "vue";
import { useStore } from "vuex";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const state = reactive({
    tableHeight: "300px",
    isTableExpanded: false,
    showMenu: null,
    showCustomScreen: false,
    eyeIcon: "bi-eye",
    newObject: {
        object: "",
        color: "",
        popupNumber: ""
    },
    filterText: "",
    popupVisible: false,
    popupInput: ""
});

const props = defineProps({
    event_id: {
        type: String,
        required: true
    }
});
const store = useStore();
const queryClient = useQueryClient();

const colorList = [
    { name: "Blue", value: "#00FFFF" },
    { name: "Orange", value: "#FFA500" },
    { name: "Purple", value: "#F600FF" },
    { name: "Green", value: "#00FF2B" },
    { name: "Yellow", value: "#F7FF00" },
    { name: "Red", value: "#FF0000" }
];

const newUnit = computed(() => {
    return store.state.newUnit;
});

const filteredItems = computed(() => {
    return store.state.units;
});

// const filteredItems = computed(() => {
//     return items.filter(item => {
//         return item.object.toLowerCase().includes(state.filterText.toLowerCase());
//     });
// });

const expandTable = () => {
    state.isTableExpanded = !state.isTableExpanded;
    state.eyeIcon = state.isTableExpanded ? "bi-eye-slash" : "bi bi-eye";
};

const addItemWithColor = (object, color, unitType, event_id) => {
    const number = prompt("Please enter a number:");
    if (number !== null) {
        newUnit.name = object + " " + number;
        newUnit.event_id = event_id;
        newUnit.unit_type = unitType;

        createUnit.mutate(newUnit);
    }
};

const createUnit = useMutation({
    mutationFn: async newUnit => {
        await supabase.from("units").insert({
            event_id: newUnit.event_id,
            name: newUnit.name,
            type: newUnit.unit_type,
            x: 20,
            y: -260
        });
    },
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["units"] });
    }
});

const addItemWithCustomColor = () => {
    if (state.newObject.object !== "" && state.newObject.color !== "") {
        const newItem = {
            object: state.newObject.object,
            zone: "",
            color: state.newObject.color,
            id: Math.random().toString(36).substr(2, 9)
        };
        // items.push(newItem);
        state.newObject.object = "";
        state.newObject.color = "";
    }
};

const deleteItem = (itemIndex, event) => {
    // event.preventDefault();
    // const itemToDelete = filteredItems.value.slice().reverse()[itemIndex];
    // const idToDelete = itemToDelete.id;
    // const indexToDelete = items.findIndex(item => item.id === idToDelete);
    // if (indexToDelete >= 0) {
    //     if (confirm(`Are you sure you want to delete "${items[indexToDelete].object}"?`)) {
    //         items.splice(indexToDelete, 1);
    //     }
    // }
};

const handleOutsideClick = event => {
    const customScreen = document.getElementById("customscreen");
    if (!customScreen.contains(event.target)) {
        const customScreenCollapse = customScreen.closest(".collapse");
        if (customScreenCollapse.classList.contains("show")) {
            customScreenCollapse.classList.remove("show");
        }
    }
};

// const updateItem = (index, key) => {
//     items[index][key] = event.target.value;
// };

document.addEventListener("click", handleOutsideClick);

onUnmounted(() => {
    // clearInterval(intervalId);
    document.removeEventListener("click", handleOutsideClick);
});

const handleKeyPress = event => {
    if (event.key === "Enter") {
        addItemWithCustomColor();
    }
};

// const updateUnit = (index, key) => {
//     filteredUnits.value[index][key] = event.target.value;
// };

document.addEventListener("click", handleOutsideClick);
document.removeEventListener("click", handleOutsideClick);
</script>

<style>
body {
    overflow: hidden;
}

/*Body moet toegevoegd worden aan normale main.css dit vanwege scrollbar die ik krijg door collapse menu. kan dit niet wijzigen */

.table-container {
    width: 188px;
    overflow-y: scroll;
    overflow-x: hidden;
    font-size: 20px;
    transition: height 0.2s ease-out;
}

.table-container.full-height {
    height: 100vh;
}

.eyeopen {
    margin-left: 157px;
    cursor: pointer;
}

.form-control {
    border-radius: 0px 0px 0px 0px;
}

.objecttext h2 {
    font-size: 20px;
}

.newObject {
    color: white;
}

.buttons {
    margin-top: 10px;
    margin-left: 20px;
}

/* Easy Add Section*/
/*.btn {
    width: 190px;
    margin-bottom: 5px;
    margin-left: 10px;
}*/

.btn-ehbo {
    background-color: #ffa500;
}

.btn-als {
    background-color: #ff00df;
}

.btn-ibt {
    background-color: #00ffff;
}

.btn-custom {
    background-color: #00ff77;
}

.customscreen {
    width: 190px;
    height: 250px;
    margin-left: 10px;
}

.collapse {
    transition: height 0.2s ease-out;
}

.collapse-up {
    transform: translateY(-118%);
}
</style>
