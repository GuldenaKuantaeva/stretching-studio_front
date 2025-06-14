<template>
    <div class="form-wrapper">
        <div class="form shadow-form">
            <div class="content">
                <div class="heading-2">Заявка</div>
                <div class="inputs payment-inputs">
                    <form @submit.prevent="purchase">
                        <!-- <div class="input-wrapper">
                            <input class="form-headline" :value="'Цена: ' + paymentStore.price + ' ₽'" disabled />
                        </div>
                        <div class="input-wrapper">
                            <input class="form-headline" :value="'Количество занятий: ' + paymentStore.sessionsNum"
                                disabled />
                        </div> -->
                        <div class="input-wrapper">
                            <input :v-model="fullName" class="input-value" placeholder="Фамилия Имя" />
                        </div>
                        <div class="inputs-in-line">
                            <div class="input-wrapper">
                                <input :v-model="phone" class="input-value" placeholder="+7 (908) 888 88 88" />
                            </div>
                        </div>
                        <div className="accept_wrapper">
                            <div>Даю согалсие на обработку персональных данных</div>
                            <div class="input-wrapper accpet_input">
                                <input :v-model="accept" class="input-value" type="checkbox" placeholder="" />
                            </div>
                        </div>
                        <button class="cta-button">Отправить заявку</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const cardNumber = ref("")
const expirationDate = ref("")
const cvvCode = ref("")

const fullName = ref("")
const phone = ref("")
const accept = ref("")

onBeforeUnmount(() => {
    cardNumber.value = ""
    expirationDate.value = ""
    cvvCode.value = ""

    fullName.value = ""
    phone.value = ""
    accept.value = ""
})

const paymentStore = usePaymentStore()

if (paymentStore.id === "")
    await navigateTo({ path: '/purchase-subscription' })

const purchase = async () => {
    const config = useRuntimeConfig()

    await $fetch<string>(config.public.apiBase + '/api/v1/purchase-subscription', {
        method: 'post',
        headers: {
            "Authorization": "Bearer " + useCookie('accessToken').value
        },
        body: {
            "subscriptionId": paymentStore.id
        }
    })
        .then(async _ => {
            await navigateTo({ path: '/account' })
        })
        .catch(async _ => {
            const authStore = useAuthStore()
            authStore.resetState()
            useCookie('accessToken').value = null

            await navigateTo({ path: '/auth/login' })
        })
}
</script>

<style scoped>
.payment-inputs {
    margin-top: -25px;
}

.inputs-in-line {
    display: flex;
    gap: 16px;
    width: 100%;
}

.accpet_input {
    width: 25px !important;
    margin: 0 !important;
}

.accept_wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
}

.form-headline {
    text-align: center;
    border: none;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    caret-color: rgb(16, 24, 40);
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: rgba(207, 72, 255, 0.1);
    border-radius: 24px;
    padding: 24px 24px 24px;
    color: #000;
}
</style>

<style scoped src="../assets/css/globals.css"></style>