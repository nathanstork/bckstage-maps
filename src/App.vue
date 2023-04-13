<template>
    <header>
        <nav>
            <div class="grid-cols-12">
                <div class="relative w-16 space-x-20 mt-3">
                    <img src="src\assets\logobackstagemaps.svg" class="absolute z-10" />
                    <h1 class="relative z-20 text-4xl font-bold">Backstagemaps</h1>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <router-view />
    </main>
</template>
