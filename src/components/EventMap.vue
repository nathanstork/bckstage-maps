<script>
import * as Panzoom from "panzoom";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import { ref } from "vue";

export default {
    name: "eventMap",
    props: {},
    components: {
        VuePDF
    },
    methods: {
        pdfLoaded() {
            console.log("PDF has loaded");

            //this.panzoom.moveTo(0, 0);
        }
    },
    setup() {
        const { pdf } = usePDF(
            "https://gudxawknwihalccacopu.supabase.co/storage/v1/object/public/maps/HJ2019%20terreintekening%20versie1.9%20all%20.pdf"
        );
        const rotation = ref(-90);
        const scale = ref(2);

        return { pdf, rotation, scale };
    },
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
        <div ref="panzoomImage">
            <VuePDF
                :pdf="pdf"
                :page="1"
                :rotation="rotation"
                :scale="scale"
                :text-layer="false"
                @loaded="pdfLoaded"
            />
        </div>
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
