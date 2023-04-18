<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <header>
        <nav class="container text-center">
            <div class="row">
                <div class="col-1">
                    <i
                        class="fa fa-cog"
                        style="font-size: 40px; color: #0096ff; margin-top: 15px"
                    ></i>
                </div>
                <div class="col-10 d-flex align-items-center justify-content-center">
                    <img
                        src="src\assets\logobackstagemaps.svg"
                        style="width: 70px !important; margin-top: 10px"
                    />
                    <h1 style="margin-left: 20px; margin-top: 10px">Backstagemaps</h1>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <router-view />
    </main>
</template>
