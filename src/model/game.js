import Formatter from '@/utils/Formatter.js';
export class ExpertGame {
	/**Конструктор для Game
	 * @param {Object} game
	 * @param {number} game.code - код игры
	 * @param {string} game.name - название игры
	 * @param {string} game.eventDate - дата игры
	 */
	constructor(game) {
		this.code = game?.code ?? null;
		this.name = game?.name ?? null;
		this.eventDate = Formatter.formatDate(Number(game?.eventdate)) ?? null;
	}
}
