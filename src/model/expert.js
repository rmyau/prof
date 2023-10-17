
export default class Expert {
    /**Код эксперта */
    id;
    /**Имя эксперта */
    name;

    /**Конструктор для эксперта
     * @param {Object} expert
     * @param {number} expert.id
     * @param {string} expert.name
     */
    constructor(expert){
        this.id = expert?.id ?? null;
        this.name = expert?.name ?? null;
    }
}