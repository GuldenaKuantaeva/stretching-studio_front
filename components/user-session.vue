<template>
    <div class="card">
        <div class="card-title">{{ sessionType }}</div>
        <div class="card-content">
            <div class="card-label pb-2">Дата и время начала</div>
            <div class="card-value">{{ convertDate(startingDate) }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    sessionType: String,
    startingDate: String,
})
</script>

<style scoped src="../assets/css/globals.css"></style>