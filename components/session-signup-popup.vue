<template>
    <div class="popup">
        <div class="popup-inner">
            <div v-if="isError" class="font-bold">
                <p class="pb-5 heading-2 text-center text-rose-500">Ошибка</p>
            </div>
            <div v-else>
                <p class="pb-5 heading-3 text-center text-green-500">Успешная запись</p>
            </div>
            <span>{{ popupMessage }}</span>
            <div v-if="isError">
                <button class="card-button" @click="$emit('onButtonPressed', false)">
                    {{ buttonText }}
                </button>
            </div>
            <div v-else>
                <button class="card-button" @click="$emit('onButtonPressed', true)">
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    buttonText: String,
    popupMessage: String,
    isError: Boolean
})
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center
}

.popup-inner {
    background: white;
    padding: 50px;
    border-radius: 24px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
</style>

<style scoped src="../assets/css/globals.css"></style>