<template>
    <div class="objectzone">
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
                    <td class="border-2 p-2 text-center" :style="{ backgroundColor: item.color }">
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
    <div class="buttons" v-if="!isTableExpanded">
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
</template>

<script>
export default {
    data() {
        return {
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
        colorList() {
            return [
                { name: "Blue", value: "#00FFFF" },
                { name: "Orange", value: "#FFA500" },
                { name: "Purple", value: "#F600FF" },
                { name: "Green", value: "#00FF2B" },
                { name: "Yellow", value: "#F7FF00" },
                { name: "Red", value: "#FF0000" }
            ];
        },
        filteredItems() {
            return this.items.filter(item => {
                return item.object.toLowerCase().includes(this.filterText.toLowerCase());
            });
        },
        isTableExpanded() {
            return this.tableHeight === "80vh";
        }
    },

    methods: {
        expandTable() {
            this.tableHeight = this.isTableExpanded ? "390px" : "80vh";
            this.isTableExpanded = !this.isTableExpanded;
            this.eyeIcon = this.isTableExpanded ? "bi-eye-slash" : "bi bi-eye";
        },

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
