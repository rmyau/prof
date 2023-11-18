<template>
	<template>
		<div class="flex justify-content-center w-full mt-5">
			<p-data-table
				:value="gameList"
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
							icon="pi pi-pencil"
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
</template>
<script>
import { useAdministratingStore } from '@/store/admin.js';
import { mapActions, mapState } from 'pinia';
export default {
	name: 'AdminGames',
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
		...mapActions(useAdministratingStore, ['getAllGames']),
	},
	computed: {
		...mapState(useAdministratingStore, ['gameList']),
	},
	mounted() {
		if (!this.gameList.length) {
			this.getAllGames();
		}
	},
};
</script>
