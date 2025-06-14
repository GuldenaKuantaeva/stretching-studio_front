<template>
    <div class="form-wrapper">
        <div class="form">
            <div class="content">
                <div class="heading-1">Регистрация</div>
                <div class="inputs">
                    <Form @submit="submitForm" :validation-schema="schema">
                        <div class="auth-input-wrapper">
                            <Field name="email" type="email" v-model="formData.email" class="input-value mb-2"
                                placeholder="Email" />
                            <ErrorMessage class="error-message text-rose-500" name="email" />
                        </div>
                        <div class="auth-input-wrapper">
                            <Field name="password" type="password" v-model="formData.password" class="input-value mb-2"
                                placeholder="Пароль" />
                            <ErrorMessage class="error-message text-rose-500" name="password" />
                        </div>

                        <div class="auth-input-wrapper">
                            <Field name="passwordConfirmation" type="password" class="input-value mb-2"
                                placeholder="Подтвердите пароль" />
                            <ErrorMessage class="error-message text-rose-500" name="passwordConfirmation" />
                        </div>
                        <button type="submit" class="cta-button">Зарегистрироваться</button>

                    </Form>
                    <p v-if="error" class="font-bold text-rose-500"> {{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'

definePageMeta({
    layout: 'register',
    middleware: 'auth'
})

const schema = yup.object({
    email: yup
        .string()
        .required('Обязательное поле')
        .email('Введите корректный email'),
}).shape({
    password: yup
        .string()
        .required('Обязательное поле')
        .min(6, 'Пароль должен быть длиной как минимум 6 символов')
        .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
        .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
        .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    passwordConfirmation: yup
        .string()
        .required('Обязательное поле')
        .min(6, 'Пароль должен быть длиной как минимум 6 символов')
        .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
        .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
        .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
})
</script>

<script lang="ts">
const formData = ref({
    email: "",
    password: ""
})

export default {
    data() {
        return {
            error: ""
        }
    },
    methods: {
        async submitForm() {
            const config = useRuntimeConfig()

            await $fetch(config.public.apiBase + '/register', {
                method: 'post',
                body: {
                    "email": formData.value.email,
                    "password": formData.value.password
                }
            })
                .then(async _ => await navigateTo({ path: '/auth/login' }))
                .catch(err => {
                    const errors = err.response._data.errors
                    if (errors.DuplicateUserName)
                        this.error = "Пользователь с данным email уже зарегистрирован"
                    else
                        this.error = "Ошибка. Проверьте введенные данные"
                })
        }
    }
}
</script>

<style scoped src="/assets/css/globals.css"></style>