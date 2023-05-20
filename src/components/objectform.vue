<template>
    <div class="objectzone">
        <div class="table-container">
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
                        <th class="border-2 p-2 text-center">
                            <div class="objecttext" style="color: white; margin-bottom: -10px">
                                <h2>Zone</h2>
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
                        @dragstart="dragStart($event, itemIndex)"
                        @dragover="dragOver($event)"
                        @drop="drop($event, itemIndex)"
                    >
                        <td
                            class="border-2 p-2 text-center"
                            :style="{ backgroundColor: item.color }"
                        >
                            <input
                                type="text"
                                v-model="item.object"
                                style="width: 85px; font-size: 15px"
                                @blur="updateItem(itemIndex, 'object')"
                                class="text-center form-control"
                            />
                        </td>
                        <td class="border-2 p-2 text-center">
                            <input
                                type="text"
                                v-model="item.zone"
                                @blur="updateItem(itemIndex, 'zone')"
                                class="text-center form-control"
                                style="width: 55px; font-size: 14px"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="buttons">
            <button
                type="button"
                class="btn btn-ambu"
                @click="addItemWithColor('Ambu', '#FFA500', 'deleteAmbu')"
            >
                Ambu
            </button>
            <button
                type="button"
                class="btn btn-als"
                @click="addItemWithColor('ALS', '#FF00DF', 'deleteALS')"
            >
                ALS
            </button>
            <button
                type="button"
                class="btn btn-ibt"
                @click="addItemWithColor('IBT', '#00FFFF', 'deleteIBT')"
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
                            v-model="newObject.object"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="color-select" class="form-label">Label:</label>
                        <select
                            class="form-select"
                            id="color-select"
                            v-model="newObject.color"
                            @change="updateColor"
                        >
                            <option value="">Choose Label</option>
                            <option
                                v-for="(color, index) in colorList"
                                :value="color.value"
                                :key="index"
                            >
                                {{ color.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label
                            class="d-block text-center mb-2 text-light"
                            :style="{
                                backgroundColor: newObject.color,
                                color: 'black',
                                padding: '5px',
                                width: '187px',
                                margin: '0 auto',
                                textAlign: 'center'
                            }"
                            >{{ newObject.object }}</label
                        >
                    </div>
                    <div class="mb-3">
                        <button
                            class="btn btn-primary d-block mx-auto"
                            style="background-color: #0096ff; margin-top: -6px"
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

<style>
body {
    overflow: hidden;
}

/*Body moet toegevoegd worden aan normale main.css dit vanwege scrollbar die ik krijg door collapse menu. kan dit niet wijzigen */

.table-container {
    height: 390px;
    width: 188px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 30px;
    font-size: 20px;
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

<script>
export default {
    data() {
        return {
            showMenu: null,
            showCustomScreen: false,
            newObject: {
                object: "",
                color: "",
                popupNumber: ""
            },
            colorList: [
                { name: "Blue", value: "#00FFFF" },
                { name: "Orange", value: "#FFA500" },
                { name: "Purple", value: "#F600FF" },
                { name: "Green", value: "#00FF2B" },
                { name: "Yellow", value: "#F7FF00" },
                { name: "Red", value: "#FF0000" }
            ],
            items: Array.from({ length: 12 }, () => ({ object: "", zone: "", color: "" })),

            filterText: "",
            popupVisible: false,
            popupInput: ""
        };
    },

    mounted() {
        document.addEventListener("click", this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleOutsideClick);
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                return item.object.toLowerCase().includes(this.filterText.toLowerCase());
            });
        }
    },

    methods: {
        addItemWithColor(object, color, deleteName) {
            const number = prompt("Please enter a number:");
            if (number !== null) {
                const item = {
                    object: object + " " + number,
                    color: color,
                    zone: "",
                    deleteName: deleteName,
                    id: Math.random().toString(36).substr(2, 9)
                };
                this.items.push(item);
            }
        },
        addItemWithCustomColor() {
            if (this.newObject.object !== "" && this.newObject.color !== "") {
                const newItem = {
                    object: this.newObject.object,
                    zone: "",
                    color: this.newObject.color,
                    id: Math.random().toString(36).substr(2, 9)
                };
                this.items.push(newItem);
                this.newObject.object = "";
                this.newObject.color = "";
            }
        },

        deleteItem(itemIndex, event) {
            event.preventDefault();
            const itemToDelete = this.filteredItems.slice().reverse()[itemIndex];
            const idToDelete = itemToDelete.id;
            const indexToDelete = this.items.findIndex(item => item.id === idToDelete);
            if (indexToDelete >= 0) {
                if (
                    confirm(
                        `Are you sure you want to delete "${this.items[indexToDelete].object}"?`
                    )
                ) {
                    this.items.splice(indexToDelete, 1);
                }
            }
        },
        handleOutsideClick(event) {
            const customScreen = this.$refs.customscreen;
            if (!customScreen.contains(event.target)) {
                const customScreenCollapse = customScreen.closest(".collapse");
                if (customScreenCollapse.classList.contains("show")) {
                    customScreenCollapse.classList.remove("show");
                }
            }
        },
        dragStart(itemIndex, event) {
            event.dataTransfer.setData("text/plain", itemIndex);
        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(itemIndex, event) {
            event.preventDefault();
            let draggedIndex = event.dataTransfer.getData("text/plain");
            let draggedItem = this.items[draggedIndex];
            this.items.splice(draggedIndex, 1);
            this.items.splice(itemIndex, 0, draggedItem);
        },
        updateItem(index, key) {
            this.items[index][key] = event.target.value;
        },
        showPopup() {
            this.popupNumber = "";
            const number = prompt("Please enter a number:");
            if (number !== null) {
                this.popupNumber = number;
            }
        }
    }
};
</script>
