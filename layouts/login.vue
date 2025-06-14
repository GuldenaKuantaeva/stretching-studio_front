<template>
    <div class="screen">
        <div class="container">
            <div class="navigation">
                <div class="logo">
                    <div class="logo-sign"></div>
                    <div class="logo-text"><nuxt-link to="/">Stretching Studio</nuxt-link></div>
                </div>
                <button class="enter-button"><nuxt-link to="/auth/register">Зарегистрироваться</nuxt-link></button>
            </div>
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped src="../assets/css/globals.css"></style>