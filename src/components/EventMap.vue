<script>
const panZoomOptions = {
    minZoom: 0.5,
    maxZoom: 5
};

export default {
    name: "eventMap",
    props: {
        options: {
            type: Object,
            default: () => panZoomOptions
        }
    },
    methods: {
        onPanStart(e) {
            console.log(e);
        },
        onInit(panzoomInstance, id) {
            panzoomInstance.on("panstart", function (e) {
                console.log(e);
            });
        }
    }
};
</script>

<template>
    <div id="panzoomContainer" style="width: 100vw; height: 500px; overflow: hidden">
        <!--        <img src="./../assets/tiger.svg" width="450" height="450" />-->
        <div>
            <panZoom
                selector=".zoomable"
                id="panzoomContainer"
                :options="options"
                @init="onInit"
                @panstart="onPanStart"
            >
                <div class="zoomable">
                    <img src="https://wouwlite.nl/assets/img/photos/bckstagecp-promo-splash.png" />
                </div>
                <div class="not-zoomable others">I am not zoomable</div>
            </panZoom>
        </div>
    </div>
</template>

<style>
#panzoomContainer {
    background-color: #8e9ec9;
}
</style>
