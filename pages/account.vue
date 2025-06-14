<template>
    <div class="page-content" v-if="!pending">
        <div class="page-block">
            <div class="block-heading">
                <div class="heading-2">Ваши тренировки</div>
            </div>
            <div class="grid grid-cols-3 gap-5 mr-15">
                <div v-for="s in userData!.sessions" :key="s.id">
                    <UserSession :session-type="s.session.sessionType.name" :starting-date="s.session.startingDate" />
                </div>
            </div>
            <div v-if="userData!.sessions.length === 0" class="heading-3 text-rose-500">
                Вы не записаны ни на одну тренировку
            </div>
            <div class="block-heading pt-5">
                <div class="heading-2">Ваши абонементы</div>
            </div>
            
                <div class="grid grid-cols-3 gap-5 mr-15">
                    <div v-for="s in userData!.subscriptions" :key="s.id">
                        <UserSubscription :sessions-num="s.sessionsLeft" />
                    </div>
                </div>
            <div v-if="userData!.subscriptions.length === 0" class="heading-3 text-rose-500">
                У вас нет приобретенных абонементов
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

interface Subscription {
    id: string,
    sessionsLeft: number,
    userId: string,
    subscription: {
        id: string,
        sessionsNum: number,
        price: number,
    }
}

interface Session {
    id: string,
    session: {
        sessionType: {
            name: string,
        },
        startingDate: string
    }
}

const config = useRuntimeConfig()

const { data: userData, error, pending } = await useAsyncData("userData", async () => {
    const [subscriptions, sessions] = await Promise.all([
        $fetch<Subscription[]>(config.public.apiBase + '/api/v1/user-subscriptions', {
            headers: {
                "Authorization": "Bearer " + useCookie('accessToken').value
            }
        }),
        $fetch<Session[]>(config.public.apiBase + '/api/v1/user-sessions', {
            headers: {
                "Authorization": "Bearer " + useCookie('accessToken').value
            }
        })
    ])

    return { subscriptions, sessions }
}, {server: false})

if (error.value) {
    const authStore = useAuthStore()
    authStore.resetState()
    useCookie('accessToken').value = null

    await navigateTo({ path: '/auth/login' })
}
</script>

<style scoped src="../assets/css/globals.css"></style>