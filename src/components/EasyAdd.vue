<template>
    <div class="buttons">
        <button class="orange-button">Ambu</button>
        <button class="purple-button">ALS</button>
        <button class="blue-button">IBT</button>
        <button class="custom-button">Custom</button>
    </div>
</template>

<style>
.buttons {
    margin-top: 50px;
    margin-left: 20px;
}

.orange-button,
.purple-button,
.blue-button,
.custom-button {
    width: 170px;
    height: 40px;

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
</style>

<script>
export default {
    name: "EasyAdd"
};
</script>
