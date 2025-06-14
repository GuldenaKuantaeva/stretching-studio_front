import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
    state: () => {
        return {
            id: "",
            price: 0,
            sessionsNum: 0
        }
    },
    actions: {
        resetState() {
            this.id = ""
            this.price = 0
            this.sessionsNum = 0
        }
    },
    persist: true
})