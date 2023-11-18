import { defineStore } from 'pinia';
import api from '@/api';
import axios from 'axios';

export const useAdministratingStore = defineStore('administratingStore', {
	state: () => ({
		/**Все игры
		 * @type {Array<Object>}
		 */
		gameList: [],

		/**Все пользователи
		 * @type {Array<Object>}
		 */
		allUsers: [],

		/**Все экперты
		 * @type {Array<Object>}
		 */
		allExperts: [],
	}),

	actions: {
		/**Получение перечня игр */
		async getAllGames() {
			try {
				const data = await axios
					.get(api.getAllGames)
					.then(response => response.data.data);

				this.gameList = data;
			} catch {
				this.gameList = [];
			}
		},
	},
});
