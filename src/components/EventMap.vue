<script>
import * as Panzoom from "panzoom";

export default {
    name: "eventMap",
    props: {},
    methods: {},
    mounted() {
        this.$nextTick(() => {
            this.panzoom = Panzoom(this.$refs.panzoomImage, {
                autocenter: true,
                initialZoom: 0.5,
                zoomSpeed: 0.065,
                minZoom: 0.25,
                maxZoom: 3,
                bounds: true,
                boundsPadding: 0.1
            });
        });
    }
};
</script>

<template>
    <div id="panzoomContainer">
        <img
            ref="panzoomImage"
            src="https://wouwlite.nl/assets/img/photos/bckstagecp-promo-splash.png"
            alt="BckstageCP image"
        />
    </div>
</template>

<style>
#panzoomContainer {
    width: 100vw;
    height: 500px;
    background-color: #8e9ec9;
    overflow: hidden;
}
</style>
