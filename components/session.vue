<template>
    <div class="card">
        <div class="card-title">{{ sessionType }}</div>
        <div class="card-content">
            <div class="card-label">Дата и время</div>
            <div class="card-value mb-3">{{ convertDate(startingDate) }}</div>
            <div class="card-label">Свободных мест</div>
            <div class="card-value">{{ freeSlotsNum }}</div>
            <button class="card-button" @click="signUp">Записаться</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: String,
    sessionType: String,
    startingDate: String,
    freeSlotsNum: Number
})

const emit = defineEmits<{onResponse: [message: string, btnText: string, isError: boolean]}>()

const signUp = async () => {
    const config = useRuntimeConfig()
    
    await $fetch(config.public.apiBase + '/api/v1/session-sign-up', {
        method: 'post',
        headers: {
            "Authorization": "Bearer " + useCookie('accessToken').value
        },
        body: {
            "sessionId": props.id
        }
        })
        .then(res => {
            emit('onResponse', 'Вы записались на тренировку', 'В личный кабинет', false)
        })
        .catch(err => {
            emit('onResponse', err.data.message, 'Закрыть', true)
        })
}
</script>

<style scoped src="../assets/css/globals.css"></style>

<style></style>