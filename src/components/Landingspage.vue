<template>
    <div class="container mx-auto">
        <header>
            <nav class="w-full">
                <div class="logo">
                    <img src="src\assets\logobackstagemaps.svg" />
                    <span>Backstagemaps</span>
                </div>
            </nav>
        </header>
        <main></main>
        <footer></footer>
    </div>
</template>

<script>
export default {
    name: "LandingPage"
};
</script>

<style>
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    top: 25px;
    color: #fff;
}

.logo {
    position: relative;
    width: 60px;
}

.logo img {
    position: absolute;
    z-index: 1;
}

.logo span {
    position: relative;
    z-index: 2;
    margin-left: 70px;
    font-size: 30px;
}
</style>
