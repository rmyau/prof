<template>
	<p-dropdown
		v-model="selected"
		:options="valueOptions"
		option-label="value"
		editable
		:class="'w-auto pad'"
		@change="
			saveSubcriterionScore(playerCode, subcriterionCode, selected.value)
		"
	></p-dropdown>
</template>

<script>
import { usePlayerCriterionStore } from '@/store/playerCriterion.js';
import { mapActions } from 'pinia';
export default {
	name: 'ChooseScore',
	props: {
		subcriterionCode: Number,
		valueCount: Number,
		selectedScore: Object,
		playerCode: Number,
	},
	data() {
		return {
			selected: this.selectedScore,
		};
	},
	methods: {
		...mapActions(usePlayerCriterionStore, ['saveSubcriterionScore']),
	},
	computed: {
		valueOptions() {
			// Генерация массива значений от 1 до valueCount
			return Array.from({ length: this.valueCount }, (_, i) => ({
				value: i,
			}));
		},
	},
};
</script>
<style>
.pad input {
	padding: 1rem 0.5rem !important;
}
</style>
