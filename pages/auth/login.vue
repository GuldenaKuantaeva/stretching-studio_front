<template>
    <div class="form-wrapper">
        <div class="form">
            <div class="content">
                <div class="heading-1">Войти</div>
                <div class="inputs">
                    <Form @submit="submitForm" :validation-schema="schema">
                        <div class="auth-input-wrapper">
                            <Field name="email" type="email" v-model="formData.email" class="input-value mb-2"
                                placeholder="Email"/>
                            <ErrorMessage class="error-message text-rose-500" name="email"/>
                        </div>
                        <div class="auth-input-wrapper">
                            <Field name="password" type="password" v-model="formData.password" class="input-value mb-2"
                                placeholder="Пароль"/>
                            <ErrorMessage class="error-message text-rose-500" name="password"/>
                        </div>
                        <button type="submit" class="cta-button">Войти</button>
                    </Form>
                    <p v-if="error" class="font-bold text-rose-500">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as yup from 'yup'

const formData = ref({
    email: "",
    password: "",
})

const schema = yup.object({
    email: yup
        .string()
        .required('Обязательное поле')
        .email('Введите корректный email'),
    password: yup
        .string()
        .required('Обязательное поле')
        .min(6, 'Пароль должен быть длиной как минимум 6 символов')
        .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
        .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
        .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

interface LoginResponse {
    accessToken: string,
    expiresIn: number,
}

export default {
    data() {
        return {
            error: ""
        }
    },
    methods: {
        async submitForm() {
            const config = useRuntimeConfig()

            await $fetch<LoginResponse>(config.public.apiBase + '/login', {
                method: 'post',
                body: {
                    "email": formData.value.email,
                    "password": formData.value.password
                }
                })
                .then(async res => {
                    useCookie('accessToken', {
                        maxAge: res.expiresIn,
                        sameSite: true,
                    }).value = res.accessToken
                    
                    const authStore = useAuthStore()
                    authStore.isLoggedIn = true
                    authStore.username = formData.value.email

                    await navigateTo({ path: '/account' })
                })
                .catch(_ => {
                    this.error = "Произошла ошибка. Убедитесь в корректности введенных данных."
                })
        }
    }
}
</script>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
    layout: 'login',
    middleware: 'auth'
})
</script>

<style scoped src="/assets/css/globals.css"></style>