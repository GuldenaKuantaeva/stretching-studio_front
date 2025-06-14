import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            username: ""
        }
    },
    actions: {
        resetState() {
            this.isLoggedIn = false
            this.username = ""
        }
    },
    persist: true
})