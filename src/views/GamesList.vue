<template>
	<div class="m-3">
		<div
			class="flex flex-column justify-content-start align-items-start ml-3 mt-3"
		>
			<p-data-table
				:value="games"
				class="w-full m-3"
			>
				<p-column
					v-for="col of columns"
					:key="col.field"
					:field="col.field"
					:header="col.header"
				>
					<template #body="data">
						<div v-if="col.field === 'name'">
							<span
								@click="chooseGame(data.data)"
								style="cursor: pointer"
							>
								{{ data.data.name }}
							</span>
						</div>
						<div v-else>
							<span>{{ data.data.eventDate }}</span>
						</div>
					</template>
				</p-column>
				<template #empty>Нет доступных игр</template>
			</p-data-table>
		</div>
	</div>
</template>
<script>
import { useExpertGamesStore } from '@/store/games.js';
import { mapActions, mapState } from 'pinia';
export default {
	name: 'GamesList',
	data() {
		return {
			columns: [
				{ header: 'Игра', field: 'name' },
				{ header: 'Дата проведения', field: 'eventDate' },
			],
		};
	},
	methods: {
		...mapActions(useExpertGamesStore, ['getGames']),
		async chooseGame(game) {
			let expertCode = Number(this.$route.params.expertCode);
			this.$router.push({
				name: 'evaluation',
				params: { expertCode: expertCode, gameCode: game.code },
			});
		},
	},
	computed: {
		...mapState(useExpertGamesStore, ['games']),
	},
	mounted() {
		this.getGames(Number(this.$route.params.expertCode));
	},
};
</script>
<style scoped></style>

element.style { }
<style>
.p-datatable .p-datatable-thead > tr > th {
	font-weight: 600;
}
</style>
