<template>
    <div class="page-content">
        <div class="page-block">
            <div class="block-heading">
                <div class="heading-2">Купить абонемент</div>
            </div>
            <div class="grid grid-cols-3 gap-5">
                <div v-for="s in subscriptions" :key="s.id">
                    <SubscriptionCard :id="s.id" :sessions-num="s.sessionsNum" :price="s.price" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Subscription {
    id: string,
    sessionsNum: number,
    price: number
}

const config = useRuntimeConfig()
const { data: subscriptions } = await useFetch<Subscription[]>(config.public.apiBase + '/api/v1/available-subscriptions', {
    server: false,
})
</script>

<style scoped src="../assets/css/globals.css"></style>