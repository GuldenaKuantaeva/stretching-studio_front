<template>
    <div class="screen">
        <div class="container">
            <div class="navigation">
                <div class="navigation-left-side">
                    <div class="logo">
                        <div class="logo-sign"></div>
                        <div class="logo-text"><nuxt-link to="/">Stretching Studio</nuxt-link></div>
                    </div>
                    <div class="navigation-list">
                        <div class="list-navbar"> <navbar-link to="/">Главная</navbar-link></div>
                        <div class="list-navbar"> <navbar-link to="/purchase-subscription">Купить абонемент</navbar-link></div>
                        <div class="list-navbar"> <navbar-link to="/session-sign-up">Записаться на тренировку</navbar-link></div>
                    </div>
                </div>
                <div v-if="!authStore.isLoggedIn">
                    <button class="enter-button button-on-white"><nuxt-link to="/auth/login">Вход</nuxt-link></button>
                </div>
                <div v-else>
                    <button class="enter-button button-on-white mr-3"><nuxt-link to="/account">{{ authStore.username }}</nuxt-link></button>
                    <button class="enter-button button-on-white" @click="logout"><nuxt-link to="/">Выход</nuxt-link></button>
                </div>
            </div>
            <div class="my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-700"></div>
            <div>
                <slot />
            </div>

        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

const logout = async () => {
    authStore.resetState()
    useCookie('accessToken').value = null
    await navigateTo({ path: 'auth/login'})
}
</script>

<style scoped src="../assets/css/globals.css"></style>