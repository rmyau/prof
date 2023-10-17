import { defineStore } from 'pinia'
import { GameData } from '@/service/GameData.js'
import ExpertGame from '@/model/game.js'

export const useExpertGamesStore = defineStore('expertGames', {
    state: () => ({
        games: [],
    }),

    actions: {
        /**Получение доступных игр для эксперта */
        async getGames() {
            const data = GameData.getGamesData()
            this.games = data.map((item) => Object.freeze(new ExpertGame(item)))
        },
    },
})
