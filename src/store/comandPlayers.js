import { defineStore } from 'pinia'
import { GameData } from '@/service/GameData.js'
import Player from '@/model/player.js'

export const useComandPlayersStore = defineStore('comandPlayers', {
    state: () => ({
        /**Список игроков команды */
        playerList: [],
        /**Код команды */
        comandId: null,
    }),

    actions: {
        /**Получение списка игроков команды по id команды
         * @param {number} comandId - код команды
         */
        async getPlayers() {
            const data = GameData.getComandPlayers()
            this.playerList = data.map((item) => Object.freeze(new Player(item)))
        },

        /**Получение кода команды по коду игры и коду эксперта
         * @param {number} gameId - код игры
         * @param {number} expertId - код эксперта
         */
        async getComandId(gameId, expertId) {
            console.log(gameId, expertId)
            const data = GameData.getComand()
            this.comandId = data[0].comandId
            return this.comandId
        },
    },
})
