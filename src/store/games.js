import { defineStore } from 'pinia';
import { ExpertGame } from '@/model/game.js';
import api from '@/api';
import axios from 'axios';

export const useExpertGamesStore = defineStore('expertGames', {
	state: () => ({
		/**Список игры
		 * @type {Array<ExpertGame>}
		 */
		games: [],
	}),

	actions: {
		/**Получение доступных игр для эксперта
		 * @param {number} expertCode
		 */
		async getGames(expertCode) {
			try {
				const data = await axios
					.post(api.getGames, {
						data: { expertCode },
					})
					.then(response => response.data);

				this.games = data.map(item =>
					Object.freeze(new ExpertGame(item))
				);
			} catch {
				this.games = [];
			}
		},
	},
});
