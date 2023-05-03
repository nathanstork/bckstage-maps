<template>
    <div class="objectzone">
        <div class="table-container">
            <div>
                <input style="width: 120px" v-model="filterText" type="text" placeholder="Filter by name..." />
            </div>
            <table>
                <thead>
                    <tr class="text-center">
                        <th class="border-2 p-2 text-center">
                            <button class="objectbutton" @click="toggleMenu('object')">
                                Objects [+]
                            </button>
                            <div v-if="showMenu === 'object'">
                                <label></label>
                                <br />
                                <label>
                                    <input class="border-2 p-1 text-center" style="width: 80px" type="text"
                                        placeholder="Object..." v-model="newObject.object" @keyup.enter="addItem"
                                        @keyup="updatedBackgroundColor" />
                                </label>
                                <br />
                                <select class="button1" s v-model="newObject.color" @change="updateColor">
                                    <option value="">Choose Label</option>
                                    <option v-for="(color, index) in colorList" :value="color.value" :key="index">
                                        {{ color.name }}
                                    </option>
                                </select>
                                <br />
                                <br />
                                <label :style="{
                                        backgroundColor: newObject.color,
                                        color: 'black',
                                        padding: '5px'
                                    }">{{ newObject.object }}</label>
                                <br />
                                <button @click="addItem">Add</button>
                            </div>
                        </th>
                        <th class="border-2 p-2 text-center">
                            <button @click="toggleMenu('zone')">Zone</button>
                            <div v-if="showMenu === 'zone'"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in filteredItems" :key="index" :style="{ backgroundColor: item.color }"
                        class="text-center" @contextmenu.prevent="deleteItem(index, $event)" draggable="true"
                        @dragstart="dragStart($event, index)" @dragover="dragOver($event)" @drop="drop($event, index)">
                        <td class="border-2 p-2 text-center">
                            <input type="text" v-model="item.object" :style="{ backgroundColor: item.color }"
                                style="width: 100px" @blur="updateItem(index, 'object')" class="text-center" />
                        </td>
                        <td class="border-2 p-2 text-center">
                            <input type="text" v-model="item.zone" @blur="updateItem(index, 'zone')" class="text-center"
                                style="width: 100px" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.table-container {
    position: relative;
    height: 360px;
    width: 255px;
    overflow-y: scroll;
}

.objectbutton {
    margin-bottom: -20px;
}

.button1 {
    font-size: 12px;
}

.newObject {
    color: white;
}

th,
td {
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

th,
td:hover {
    width: 120%;
}
</style>

<script>
export default {
    data() {
        return {
            showMenu: null,
            newObject: {
                object: "",
                color: ""
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
            filterText: ""
        };
    },

    computed: {
        filteredItems() {
            let filterText = this.filterText.toLowerCase().trim();
            if (!filterText) {
                return this.items;
            }
            return this.items.filter(item => {
                let objectMatches = item.object.toLowerCase().includes(filterText);
                let colorMatches = item.color.toLowerCase().includes(filterText);
                return objectMatches || colorMatches;
            });
        }
    },

    methods: {
        updateItem(index, field) {
            console.log(`Item ${index} updated:`, this.items[index]);
        },
        toggleMenu(menu) {
            if (this.showMenu === menu) {
                this.showMenu = null;
            } else {
                this.showMenu = menu;
            }
        },

        addItem() {
            let emptySlotIndex = this.items.findIndex(item => item.object === "");
            if (emptySlotIndex !== -1) {
                this.items[emptySlotIndex].object = this.newObject.object;
                this.items[emptySlotIndex].color = this.newObject.color;
            } else {
                this.items.push({
                    object: this.newObject.object,
                    zone: "",
                    color: this.newObject.color
                });
            }
            this.newObject.object = "";
            this.newObject.color = "";
            this.showMenu = null;
        },

        deleteItem(index, event) {
            event.preventDefault();
            if (event.button === 2) {
                if (confirm("Are you sure you want to delete this item?")) {
                    this.items.splice(index, 1);
                }
            }
        },
        dragStart(event, index) {
            event.dataTransfer.setData("text/plain", index);
        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(event, index) {
            event.preventDefault();
            let draggedIndex = event.dataTransfer.getData("text/plain");
            let draggedItem = this.items[draggedIndex];
            this.items.splice(draggedIndex, 1);
            this.items.splice(index, 0, draggedItem);
        },
        updateColor(event) {
            this.newObject.color = event.target.value;
        },
        updatedBackgroundColor() {
            let object = this.newObject.object.toLowerCase();
            if (object.includes("ambu")) {
                this.newObject.color = "#FFA500";
            } else if (object.includes("ibt")) {
                this.newObject.color = "#00FFFF";
            } else if (object.includes("als")) {
                this.newObject.color = "#F600FF";
            } else {
                this.newObject.color = "";
            }
        }
    }
};
</script>
