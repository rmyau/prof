<template>
	<div class="flex justify-content-center w-full mt-5">
		<p-data-table
			:value="games"
			class="w-6"
			paginator
			:rows="5"
		>
			<p-column
				v-for="col of columns"
				:key="col.field"
				:field="col.field"
				:header="col.header"
				sortable
			>
			</p-column>
			<p-column>
				<template #body="{ data }">
					<p-button
						icon="pi pi-search"
						rounded
						text
						@click="chooseGame(data)"
					></p-button>
				</template>
			</p-column>

			<template #paginatorstart>
				<p-button
					type="button"
					icon="pi pi-refresh"
					text
					rounded
				></p-button>
			</template>
			<template #paginatorend>
				<p-button
					type="button"
					icon="pi pi-download"
					text
					rounded
				></p-button>
			</template>
			<template #empty>Нет доступных игр</template>
		</p-data-table>
	</div>
</template>
<script>
import { useExpertGamesStore } from '@/store/games.js'
import { mapActions, mapState } from 'pinia'
export default {
	name: 'GamesList',
	data() {
		return {
			columns: [
				{ header: 'Номер', field: 'code' },
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
