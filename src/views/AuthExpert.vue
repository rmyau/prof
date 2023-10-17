<template>
    <div class="flex justify-content-center mt-8">
        <p-card class="w-5">
            <template #title><div style="text-align: center">Добро пожаловать!</div></template>
            <template #content>
                <div class="flex justify-content-center mt-4">
                    <div class="flex flex-column justify-content-center gap-4 w-6">
                        <span class="p-float-label">
                            <p-input-text id="login" class="w-full" style="border-radius: 30px"></p-input-text>
                            <label for="login">Логин</label>
                        </span>
                        <span class="p-float-label">
                            <p-input-text id="password" class="w-full" style="border-radius: 30px"></p-input-text>
                            <label for="password">Пароль</label>
                        </span>
                        <p-button label="Войти" class="mt-3" style="border-radius: 30px" @click="goNext()"></p-button>
                    </div>
                </div>
            </template>
        </p-card>
    </div>
</template>

<script>
import { useExpertStore } from '@/store/expert.js'
import { mapState } from 'pinia'
export default {
    name: 'AuthExpert',
    methods: {
        goNext() {
            this.$router.push('games/' + this.login)
        },
    },
    computed: {
        ...mapState(useExpertStore, ['login']),
    },
}
</script>
