<template>
    <div class="objectzone">
        <div class="table-container">
            <div>
                <input
                    style="width: 171px"
                    v-model="filterText"
                    type="text"
                    placeholder="Filter by name..."
                />
            </div>
            <table style="width: 80px">
                <thead>
                    <tr class="text-center">
                        <th class="border-2 p-2 text-center">
                            <div class="objecttext">
                                <h2>Objects</h2>
                            </div>
                        </th>
                        <th class="border-2 p-2 text-center">
                            <div class="objecttext">
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
                    >
                        <td
                            class="border-2 p-2 text-center"
                            :style="{ backgroundColor: item.color }"
                        >
                            <input
                                type="text"
                                v-model="item.object"
                                style="width: 84px"
                                @blur="updateItem(itemIndex, 'object')"
                                class="text-center"
                            />
                        </td>
                        <td class="border-2 p-2 text-center">
                            <input
                                type="text"
                                v-model="item.zone"
                                @blur="updateItem(itemIndex, 'zone')"
                                class="text-center"
                                style="width: 50px"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="buttons">
            <button
                class="orange-button"
                @click="addItemWithColor('Ambu', '#FFA500', 'deleteAmbu')"
            >
                Ambu
            </button>
            <button class="purple-button" @click="addItemWithColor('ALS', '#FF00DF', 'deleteALS')">
                ALS
            </button>
            <button class="blue-button" @click="addItemWithColor('IBT', '#00FFFF', 'deleteIBT')">
                IBT
            </button>
            <button class="custom-button" @click="showCustomScreen = !showCustomScreen">
                Custom [+]
            </button>
            <div
                class="customscreen"
                v-if="showCustomScreen"
                ref="customscreen"
                style="background-color: #00ff77; border: 3px solid black"
            >
                Object:<input
                    class="border-2 p-1 text-center"
                    :style="{ margin: '20px 15px 0', width: '100px', 'font-size': '16px' }"
                    type="text"
                    v-model="newObject.object"
                />
                Label:
                <select
                    class="button1"
                    :style="{ margin: '10px 20px 0', width: '100px' }"
                    s
                    v-model="newObject.color"
                    @change="updateColor"
                >
                    <option value="">Choose Label</option>
                    <option v-for="(color, index) in colorList" :value="color.value" :key="index">
                        {{ color.name }}
                    </option>
                </select>
                <br />
                <label
                    :style="{
                        backgroundColor: newObject.color,
                        color: 'black',
                        padding: '5px',
                        width: '187px',
                        margin: '30px auto 0',
                        textAlign: 'center'
                    }"
                    >{{ newObject.object }}</label
                >
                <br />
                <button
                    :style="{ margin: '10px 43px 0', width: '100px' }"
                    @click="addItemWithCustomColor"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.table-container {
    position: relative;
    height: 360px;
    width: 188px;
    overflow-y: scroll;
    margin-left: 30px;
}

.objecttext h2 {
    font-size: 20px;
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

.buttons {
    margin-top: 50px;
    margin-left: 20px;
}

/* Easy Add Section*/
.buttons {
    margin-top: 30px;
}

.orange-button,
.purple-button,
.blue-button,
.custom-button {
    width: 190px;
    height: 40px;
    margin-left: 10px;
    border: solid 2px black;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
    margin-bottom: 5px;
}

.orange-button {
    background-color: orange;
    color: black;
}

.purple-button {
    background-color: #ff00df;
    color: black;
}

.blue-button {
    background-color: #00ffff;
    color: black;
}

.custom-button {
    background-color: #00ff77;
    color: black;
}

.customscreen {
    width: 190px;
    height: 200px;
    margin-left: 10px;
    background-color: white;
    color: black;
    margin-top: -190px;
}
</style>

<script>
export default {
    data() {
        return {
            showMenu: null,
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
            showCustomScreen: false,
            popupInput: ""
        };
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
                    deleteName: deleteName
                };
                this.items.push(item);
            }
        },
        addItemWithCustomColor() {
            this.filteredItems.push({
                object: this.newObject.object,
                zone: "",
                color: this.newObject.color
            });
            this.newObject.object = "";
            this.newObject.color = "";
            this.showCustomScreen = false;
        },

        deleteItem(itemIndex, event) {
            event.preventDefault();
            const itemToDelete = this.filteredItems.slice().reverse()[itemIndex];
            const deleteName = itemToDelete.deleteName;
            const indexToDelete = this.items.findIndex(item => item.deleteName === deleteName);
            if (indexToDelete >= 0) {
                if (confirm(`Are you sure you want to delete "${deleteName}"?`)) {
                    this.items.splice(indexToDelete, 1);
                }
            }
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
