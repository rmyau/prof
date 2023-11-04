import { defineStore } from 'pinia';
import api from '@/api';
import axios from 'axios';

export const useCriterionScoreStore = defineStore('criterionScore', {
	state: () => ({}),

	actions: {
		/**Получение подкритериев и значения по ним для всех членов команды
		 * @param {number} gameCode код игры
		 * @param {number} expertCode код эксперта
		 * @param {number} criterionCode код критерия
		 * @return {Array<Object>}
		 */
		async getCritetionPartsData(gameCode, expertCode, criterionCode) {
			try {
				const data = await axios
					.post(api.getCriterianScore, {
						data: { gameCode, expertCode, criterionCode },
					})
					.then(response => response.data.data);

				return data;
			} catch {
				return [];
			}
		},
	},
});
