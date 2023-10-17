export default class ExpertGame {

    /**Конструктор для Game
     * @param {Object} game
     * @param {number} game.id - код игры
     * @param {string} game.name - название игры
     */
    constructor(game) {
        this.id = game?.id ?? null
        this.name = game?.name ?? null
    }
}
