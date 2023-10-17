import { defineStore } from 'pinia'
import { GameData } from '@/service/GameData.js'

export const useExpertStore = defineStore('expert', {
    state: () => ({
        id: null,
        name: '',
        login: 'a',
    }),

    actions: {
        /**Получение пользователя по логину и паролю
         * @param {string} login
         * @param {string} password
         * @returns {boolean}
         */
        async getUser(login, password) {
            const data = GameData.getExpertData()
            let expertIndex = data.findIndex((item) => item.login === login && item.password === password)
            if (expertIndex == -1) return false
            else {
                this.user = { id: data[expertIndex].id, name: data[expertIndex].name, login: data[expertIndex].login }
                return true
            }
        },
    },
})
