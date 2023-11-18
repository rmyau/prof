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

		/**Данные по пользователям с уже доступными оценками по ним
		 * @type {Array<Object>}
		 */
		playersScoreData: [],
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

		/**Получение подкритериев
		 * @param {number} criterionCode код критерия
		 * @return {Array<Object>}
		 */
		async getCritetionPartsData(criterionCode) {
			try {
				const data = await axios
					.post(api.getSubcriterianList, {
						data: { criterionCode },
					})
					.then(response => response.data.data);

				return data;
			} catch {
				return [];
			}
		},

		/**Получение всех пользователей с заданными оценками
		 *@param {number} gameCode код игры
		 * @param {number} expertCode код эксперта
		 */
		async getPlayersScoreData(gameCode, expertCode) {
			try {
				this.playersScoreData = [];
				const data = await axios
					.post(api.getUserScore, {
						data: { gameCode, expertCode },
					})
					.then(response => response.data.users);

				this.playersScoreData = data;
			} catch {
				this.playersScoreData = [];
			}
		},
		/** Сохранение новой оценки для подкритерия
		 * @param {number} playerCode
		 * @param {number} subcriterionCode
		 * @param {number} score
		 */
		saveSubcriterionScore(playerCode, subcriterionCode, score) {
			const indPlayer = this.playersScoreData.findIndex(
				item => item.code === playerCode
			);
			const playerScores = this.playersScoreData[indPlayer].score;
			const indScore = playerScores?.findIndex(
				item => item.subcriterionCode === subcriterionCode
			);
			indScore === -1
				? playerScores.push({ subcriterionCode, score })
				: (playerScores[indScore].score = score);
			this.playersScoreData[indPlayer].score = playerScores;
		},

		/**Сохранение всех оценок в базу*/
		saveCriterionScores() {
			console.log(this.playersScoreData);
		},
	},
});
