export default class Player {
    /**Конструктор для Player
     * @param {Object} player
     * @param {number} player.id - код игрока
     * @param {string} player.name - имя игрока
     * @param {string} player.sex - пол игрока
     * @param {number} player.age - возраст игрока
     */
    constructor(player) {
        this.id = player?.id ?? null
        this.name = player?.name ?? null
        this.sex = player?.sex ?? null
        this.age = player?.age ?? null
    }
}
