<template>
    <div class="main-page-container">
        <img src="~/assets/img/main-image.jpg" class="main-image" />
        <div class="main-title heading-1">Stretching studio</div>
        <div class="main-description heading-2">Студия растяжки</div>
    </div>
    <div class="my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-700"></div>
</template>

<script setup>
</script>

<style scoped>
.main-page-container {
    position: relative;
    text-align: center;
    color: white;
}

.main-image {
    filter: brightness(45%);
    margin-top: 25px;
    width: 100vw;
}

.main-title {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.main-description {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>

<style scoped src="../assets/css/globals.css"></style>