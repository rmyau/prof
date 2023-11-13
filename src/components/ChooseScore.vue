<template>
	<p-dropdown
		v-model="selected"
		:options="valueOptions"
		option-label="value"
		editable
		:class="'w-auto pad'"
	></p-dropdown>
</template>

<script>
export default {
	name: 'ChooseScore',
	props: {
		subcriterionCode: Number,
		valueCount: Number,
		selectedScore: Object,
	},
	data() {
		return {
			selected: this.selectedScore,
		};
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
.pad input{
	padding: 1rem 0.5rem !important;
}
</style>
