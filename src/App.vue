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
                    <img
                        src="src\assets\logobackstagemaps.svg"
                        style="width: 45px; margin-top: 5px"
                    />
                    <h1 style="margin-left: 2px; margin-top: 20px; font-size: 24px">
                        Backstagemaps
                    </h1>
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
