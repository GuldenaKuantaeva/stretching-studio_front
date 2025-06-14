<template>
    <div class="card">
        <div class="card-title">Количество занятий: {{ props.sessionsNum }}</div>
        <div class="card-content">
            <div class="card-label">Стоимость</div>
            <div class="card-value">{{ props.price }} ₽</div>
        </div>
        <button class="card-button" @click="setPaymentData"><nuxt-link to="/payment">Купить</nuxt-link></button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    id: String,
    sessionsNum: Number,
    price: Number
})

const setPaymentData = () => {
    const paymentStore = usePaymentStore()
    paymentStore.id = props.id!
    paymentStore.sessionsNum = props.sessionsNum!
    paymentStore.price = props.price!
}
</script>

<style scoped src="../assets/css/globals.css"></style>