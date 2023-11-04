<template>
	<div>
		<p-data-table :value="data">
			<p-column
				field="name"
				header="Критерий"
			>
				<template #body="item">
					<div class="flex align-items-center">
						<div class="font-medium">{{ item.data.name }}</div>
						<i class="pi pi-info-circle ml-2" v-p-tooltip.bottom="item.data.descValue"></i>
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
import { useCriterionScoreStore } from '@/store/criterionScore.js';
import { mapActions, mapState } from 'pinia';
import { usePlayerCriterionStore } from '@/store/playerCriterion.js';
export default {
	name: 'CriterionScore',
	props: {
		criterionCode: Number,
	},
	data() {
		return {
			items: null,
			players: [],
			data: [],
		};
	},
	methods: {
		...mapActions(useCriterionScoreStore, ['getCritetionPartsData']),
		formatDescValue(descValue) {
			return descValue
				.map(value => `${value.cost} - ${value.desc}`)
				.join('\n');
		},
	},
	computed: {
		...mapState(useCriterionScoreStore, ['criterionPartsData']),
		...mapState(usePlayerCriterionStore, ['playerList']),
	},
	async mounted() {
		this.items = await this.getCritetionPartsData(
			Number(this.$route.params.gameCode),
			Number(this.$route.params.expertCode),
			this.criterionCode
		);

		if (this.items.length) {
			// Создаем список игроков и их колонок
			this.players = this.playerList.map(player => ({
				field: `${player.code}`,
				header: `Игрок ${player.code}`,
			}));

			// Преобразуем данные
			this.data = this.items.map(item => {
				const playerData = item.players || [];
				const playerScores = {}; // Объект для хранения баллов игроков

				// Заполните объект playerScores данными из playerData
				playerData.forEach(player => {
					playerScores[player.code] = player.score;
				});

				// Создайте массив данных с баллами игроков и `null` для отсутствующих игроков
				const playerFields = this.playerList.map(userCode => {
					return userCode in playerScores
						? playerScores[userCode]
						: null;
				});

				// Сортируем descValue по полю cost
				const sortedDescValue = item.descValue.sort(
					(a, b) => a.cost - b.cost
				);
				return {
					name: item.name,
					descValue: this.formatDescValue(sortedDescValue),
					valueCount: sortedDescValue.length,
					...playerFields.reduce((acc, score, index) => {
						acc[`player_${index + 1}`] = score;
						return acc;
					}, {}),
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
