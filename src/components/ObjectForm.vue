<template>
    <div class="objectzone mt-5">
        <button type="button" class="eyeopen" @click="expandTable">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-eye-slash-fill"
                viewBox="0 0 16 16"
            >
                <path
                    v-if="eyeIcon === 'bi bi-eye'"
                    d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                />
                <path
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                />

                <path
                    v-if="eyeIcon === 'bi-eye-slash'"
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                />
                <path
                    v-else
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0.0 0 2.829 2.829z"
                />
                <path
                    v-else
                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                />
            </svg>
        </button>
    </div>
    <div class="table-container" :style="{ height: tableHeight }">
        <div class="sticky-top">
            <input
                class="form-control sticky-top"
                style="width: 173px; background-color: lightgrey"
                v-model="filterText"
                type="text"
                placeholder="Filter by name..."
            />
        </div>
        <table class="table table-bordered table-striped">
            <thead class="sticky-top" style="background-color: #333333">
                <tr class="text-center">
                    <th class="border-2 p-2 text-center">
                        <div class="objecttext" style="color: white; margin-bottom: -10px">
                            <h2>Objects</h2>
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
                    <td class="border-2 p-2 text-center" :style="{ backgroundColor: item.color }">
                        <input
                            type="text"
                            v-model="item.object"
                            style="width: 100px; font-size: 15px; margin-left: 30px"
                            @blur="updateItem(itemIndex, 'object')"
                            class="text-center form-control"
                            disabled
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="current-time">
        <p style="font-size: 22px; font-weight: bold">{{ currentTime }}</p>
    </div>
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
</template>

<script setup>
import { computed, reactive, defineProps } from "vue";
import { useStore } from "vuex";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const state = reactive({
    tableHeight: "390px",
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
    state.tableHeight = state.isTableExpanded ? "390px" : "80vh";
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
            x: "A",
            y: 1
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
    event.preventDefault();
    const itemToDelete = filteredItems.value.slice().reverse()[itemIndex];
    const idToDelete = itemToDelete.id;
    const indexToDelete = items.findIndex(item => item.id === idToDelete);
    if (indexToDelete >= 0) {
        if (confirm(`Are you sure you want to delete "${items[indexToDelete].object}"?`)) {
            items.splice(indexToDelete, 1);
        }
    }
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
        clearInterval(intervalId);
        document.removeEventListener("click", handleOutsideClick);
    });
});
const handleKeyPress = event => {
    if (event.key === "Enter") {
        addUnitWithCustomColor();
    }
};

const updateUnit = (index, key) => {
    filteredUnits.value[index][key] = event.target.value;
};

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
    margin-left: 30px;
    font-size: 20px;
    transition: height 0.2s ease-out;
}

.table-container.full-height {
    height: 100vh;
}

.eyeopen {
    margin-left: 187px;
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

.btn-ambu {
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
