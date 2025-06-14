<template>
    <div class="card">
        <div class="card-title">Абонемент</div>
        <div class="card-content">
            <div class="card-label pb-2">Оставшееся количество занятий</div>
            <div class="card-value">{{ props.sessionsNum }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    sessionsNum: Number
})
</script>

<style scoped src="../assets/css/globals.css"></style>