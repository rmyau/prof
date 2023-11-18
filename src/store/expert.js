import { defineStore } from 'pinia';
import api from '@/api';
import axios from 'axios';

export const useExpertStore = defineStore('expert', {
	state: () => ({
		/**Код эксперта
		 * @type {number}
		 */
		code: null,
		/**Имя эксперта
		 * @type {string}
		 */
		name: '',
		/**Логин эксперта
		 * @type {string}
		 */
		login: '',
		/**Является ли админом
		 * @type {number}
		 */
		isAdmin: 0,
	}),

	actions: {
		/**Получение пользователя по логину и паролю
		 * @param {string} login
		 * @param {string} password
		 */
		async getUser(login, password) {
			const response = await axios.post(api.login, {
				data: { login, password },
			});
			if (response.data.auth) {
				const user = response.data.user;
				this.code = user?.code ?? null;
				this.name = user?.name ?? '';
				this.login = user?.login ?? '';
				this.isAdmin = user?.isAdmin ?? 0;
			}
		},
	},
});
