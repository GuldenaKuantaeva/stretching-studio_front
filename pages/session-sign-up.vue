<template>
    <div class="page-content">
        <div class="page-block">
            <div class="block-heading">
                <div class="heading-2">Запись на тренировку</div>
            </div>
            <div class="grid grid-cols-3 gap-5">
                <div v-for="s in sessions" :key="s.id">
                    <Session 
                        :id="s.id" 
                        :session-type="s.sessionType.name" 
                        :starting-date="s.startingDate" 
                        :free-slots-num="s.freeSlotsNum"
                        @on-response="responseReact"/>
                </div>
            </div>
            <div v-if="popupShown">
                <SessionSignupPopup @on-button-pressed="onButtonPressed" 
                :button-text="buttonText" 
                :popup-message="popupMessage"
                :is-error="isError" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const popupShown = ref(false)
const popupMessage = ref("")
const buttonText = ref("")
const isError = ref(false)

const onButtonPressed = async (isSuccess: boolean) => {
    popupShown.value = false
    if (isSuccess)
        await navigateTo({ path: '/account' })
}

const responseReact = (message: string, btnText: string, isErr: boolean) => {
    popupMessage.value = message
    buttonText.value = btnText
    popupShown.value = true
    isError.value = isErr
}

interface Session {
    id: string,
    sessionType: {
        id: string,
        name: string,
        duration: number
    },
    startingDate: string,
    freeSlotsNum: number
}

const config = useRuntimeConfig()

const { data: sessions } = await useFetch<Session[]>(config.public.apiBase + '/api/v1/upcoming-sessions?free-slots-only=true', {
    server: false,
})
</script>

<style scoped src="../assets/css/globals.css"></style>