<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <header>
        <nav class="container text-center">
            <div class="row">
                <div class="col-1">
                    <CogIcon />
                </div>
                <div class="col-10 d-flex align-items-center justify-content-center">
                    <div class="image-container">
                        <img
                            src="src/assets/logobackstagemaps.svg"
                            style="width: 60px; margin-top: 5px"
                            class="hover-image"
                        />
                        <span class="hover-text">Bckstagemaps</span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div class="objectform col-2 align-items-right" style="float: right; margin-top: 20px">
            <objectzone></objectzone>
        </div>
        <router-view />
    </main>
</template>

<style>
.image-container {
    position: relative;
    display: inline-block;
}

.hover-text {
    position: absolute;
    font-size: 24px;
    top: 32px;
    left: 60px;
    transform: translateY(-50%);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    white-space: nowrap;
}

.hover-image:hover + .hover-text {
    opacity: 1;
    pointer-events: auto;
}
</style>

<script>
import CogIcon from "./components/Gearsettings.vue";
import objectzone from "./components/objectform.vue";

export default {
    components: {
        CogIcon,
        objectzone
    }
};
</script>
