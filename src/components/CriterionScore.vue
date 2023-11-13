<template>
	<div>
		<p-data-table :value="dataTable">
			<p-column
				field="name"
				header="Критерий"
			>
				<template #body="item">
					<div class="flex align-items-center gap-3">
						<div class="font-medium">{{ item.data.name }}</div>
						<i
							class="pi pi-info-circle ml-2"
							v-p-tooltip.bottom="item.data.descValue"
						></i>
					</div>

					<div class="text-sm font-light p-cell-desc"></div>
				</template>
			</p-column>
			<p-column
				v-for="player in players"
				:key="player.field"
				:field="player.field"
				:header="player.header"
				style="width: 10%"
			>
				<template #body="data"
					><choose-score
						:value-count="data.data.valueCount"
						:selected-score="findScore(player.code, data.data.code)"
					></choose-score
				></template>
			</p-column>
		</p-data-table>
	</div>
</template>
<script>
import { mapActions } from 'pinia';
import { usePlayerCriterionStore } from '@/store/playerCriterion.js';
import ChooseScore from './ChooseScore.vue';
export default {
	name: 'CriterionScore',
	components: { ChooseScore },
	props: {
		criterionCode: Number,
		playersScoreData: Array, //данные пользователей с оценками
		players: Array, //данные для отображения столбцом по пользователям
	},
	data() {
		return {
			items: null, // исходные данные по подкритериям
			dataTable: [], //преобразованные для отображения в таблице данные
			playersScores: new Map(), //структура с оценками пользователей по подкритериям
			selected: null,
		};
	},
	methods: {
		...mapActions(usePlayerCriterionStore, ['getCritetionPartsData']),
		formatDescValue(descValue) {
			return descValue
				.map(value => `${value.cost} - ${value.desc}`)
				.join('\n');
		},
		findScore(playerCode, subcriterionCode) {
			const scoreData = this.playersScores
				.get(playerCode)
				.find(item => item.subcriterionCode === subcriterionCode);
			return scoreData.score ? { value: scoreData.score } : null;
		},
		saveCriterionScore(playerCode, subcriterionCode, score) {
			const playerScores = this.playerScores.get(playerCode);
			//дописать
			playerScores = playerScores.map((item) => item.subcriterionCode===subcriterionCode? )
		},
	},
	computed: {},
	async mounted() {
		this.items = await this.getCritetionPartsData(this.criterionCode);
		if (this.items.length) {
			// Преобразуем данные
			this.dataTable = this.items.map(item => {
				const playerScores = {};
				this.playersScoreData.forEach(player => {
					//ищем оценку для подкритерия у пользователя
					const scoreSubcriterion =
						player.score.find(
							playerScore =>
								playerScore.subcriterionCode === item.id
						)?.score ?? null;
					playerScores[`player_${player.code}`] = scoreSubcriterion;
					//записываем в Map оценки для всех подкритериев для удобства сохранения
					let scoresArray;
					if (this.playersScores.has(player.code)) {
						scoresArray = this.playersScores.get(player.code);
					} else {
						scoresArray = [];
					}
					scoresArray.push({
						subcriterionCode: item.id,
						score: scoreSubcriterion,
					});
					this.playersScores.set(player.code, scoresArray);
				});

				// Сортируем descValue по полю cost
				const sortedDescValue = item.descValue.sort(
					(a, b) => a.cost - b.cost
				);
				return {
					code: item.id,
					name: item.name,
					descValue: this.formatDescValue(sortedDescValue),
					valueCount: sortedDescValue.length,
					...playerScores,
				};
			});
		}
	},
};
</script>
<style scoped>
.p-cell-desc {
	white-space: pre-line;
}
</style>
