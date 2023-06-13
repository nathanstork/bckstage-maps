<template>
    <div>
        <i
            class="fa fa-cog"
            @click="toggleDropdown"
            style="font-size: 40px; color: #0096ff; margin-top: 15px"
        ></i>
        <ul v-if="showDropdown" class="custom-dropdown">
            <li class="dropdown-item">
                <img src="src/assets/rotate.png" width="20px" alt="Rotate Image" />
                Rotate Image
            </li>
            <li class="dropdown-item">
                <img src="src/assets/add new.png" width="20px" alt="Add new PDF" />
                Add new PDF
            </li>
            <li class="dropdown-item">
                <img src="src/assets/clear all.png" width="20px" alt="Clear Objects" />
                Clear Objects
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CogIcon",
    data() {
        return {
            showDropdown: false
        };
    },
    mounted() {
        document.addEventListener("click", this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleOutsideClick);
    },
    methods: {
        handleOutsideClick(event) {
            if (!this.$el.contains(event.target)) {
                this.showDropdown = false;
            }
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        }
    }
};
</script>

<style>
.custom-dropdown {
    position: absolute;
    top: 60px;
    left: -12px;
    width: 150px;
    margin: 0;
    padding: 0px 0;
    background-color: white;
    border-radius: 4px;
    border: solid 3px black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    list-style: none;
    font-size: 14px;
    text-align: left;
    transition: 0.2s;
}

.custom-dropdown .dropdown-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    color: black;
    text-decoration: none;
    border-bottom: 2px solid black;
}

.custom-dropdown .dropdown-item img {
    margin-right: 8px;
}

.custom-dropdown .dropdown-item:hover {
    background-color: grey;
}

.fa-cog {
    cursor: pointer;
    transition: transform 0.3s ease-in-out; /* add transition */
}

.fa-cog:hover {
    transform: rotate(90deg); /* rotate on hover */
}
</style>
