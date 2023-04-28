<template>
    <div class="plus-icon" @click="toggleSign">
        <span class="plus-sign">{{ sign }}</span>
    </div>
</template>

<script>
export default {
    name: "PSlusIcon",
    data() {
        return {
            sign: "+"
        };
    },
    methods: {
        toggleSign() {
            this.sign = this.sign === "+" ? "-" : "+";
        }
    }
};
</script>

<style>
.plus-icon {
    color: #0096ff;
    position: absolute;
    margin-top: -33px;
}

.plus-sign {
    font-size: 80px;
}
</style>
