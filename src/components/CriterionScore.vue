<template>
	<div>
		<p-data-table :value="data">
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
			></p-column>
		</p-data-table>
	</div>
</template>
<script>
import { mapActions } from 'pinia';
import { usePlayerCriterionStore } from '@/store/playerCriterion.js';
export default {
	name: 'CriterionScore',
	props: {
		criterionCode: Number,
		playersScoreData: Array, //данные пользователей с оценками
		players: Array, //данные для отображения столбцом по пользователям
	},
	data() {
		return {
			items: null,
			data: [],
		};
	},
	methods: {
		...mapActions(usePlayerCriterionStore, ['getCritetionPartsData']),
		formatDescValue(descValue) {
			return descValue
				.map(value => `${value.cost} - ${value.desc}`)
				.join('\n');
		},
	},
	async mounted() {
		this.items = await this.getCritetionPartsData(this.criterionCode);
		if (this.items.length) {
			// Преобразуем данные
			this.data = this.items.map(item => {
				const playerScores = {};
				this.playersScoreData.forEach(player => {
					//ищем оценку для подкритерия у пользователя
					const scoreSubcriterion =
						player.score.find(
							playerScore =>
								playerScore.subcriterionCode == item.id
						)?.score ?? null;
					playerScores[`player_${player.code}`] = scoreSubcriterion;
				});

				// Сортируем descValue по полю cost
				const sortedDescValue = item.descValue.sort(
					(a, b) => a.cost - b.cost
				);
				return {
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
