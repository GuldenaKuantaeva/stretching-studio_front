import { useAuthStore } from "~/stores/auth"
import { userAuthenticated } from "./auth"

export default defineNuxtRouteMiddleware((to) => {
    const accessToken = useCookie('accessToken')

    const authStore = useAuthStore()

    if (!userAuthenticated(accessToken.value)) {
        authStore.isLoggedIn = false
        authStore.username = ""
    }
        
    return
})