<template>
    <header>
        <nav class="container text-center">
            <div class="row">
                <div class="col-1">Gear for Settings</div>
                <div class="col-10 d-flex align-items-center justify-content-center">
                    <img
                        src="src\assets\logobackstagemaps.svg"
                        style="width: 70px !important; margin-top: 10px"
                    />
                    <h1 style="margin-left: 20px; margin-top: 10px">Backstagemaps</h1>
                </div>
                <div class="col-1">x</div>
            </div>
        </nav>
    </header>
    <main>
        <router-view />
    </main>
</template>
