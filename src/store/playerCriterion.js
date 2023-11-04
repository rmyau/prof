import { defineStore } from 'pinia';
import api from '@/api';
import axios from 'axios';

export const usePlayerCriterionStore = defineStore('playerCriterion', {
	state: () => ({
		//TODO: сделать модель для хранения критериев

		/**Структура для хранения критериев
		 * @type {Array<Object>}
		 */
		criterionList: [],

		/**Список кодов пользователей
		 * @type {Array<Object>}
		 */
		playerList: [],
	}),

	actions: {
		/**Получение перечня критериев */
		async getCriterionList() {
			try {
				const data = await axios
					.get(api.getCriteriaList)
					.then(response => response.data.data);

				this.criterionList = data;
			} catch {
				this.criterionList = [];
			}
		},

		/**Получение списка кодов пользователей
		 * @param {number} gameCode код игры
		 * @param {number} expertCode код эксперта
		 */
		async getPlayerList(gameCode, expertCode) {
			try {
				const data = await axios
					.post(api.getTeamUsers, { data: { gameCode, expertCode } })
					.then(response => response.data);
				console.log(data, 'data');
				this.playerList = data;
			} catch {
				this.playerList = [];
			}
		},
	},
});
