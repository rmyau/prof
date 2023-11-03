<template>
	<div>
		<div
			v-for="criterionBlock of criterionList"
			:key="criterionBlock.blockId"
			class="m-3"
		>
			<span class="text-xl text-900 font-bold">{{
				criterionBlock.nameCriterionBlock
			}}</span>
			<div
				v-for="criterion of criterionBlock.criterion"
				:key="criterion.id"
				class="p-2"
			>
				<span class="text-l text-900 font-bold">{{ criterion.name }}</span>
				<criterion-score :criterion-code="criterion.id"></criterion-score>
			</div>
		</div>
	</div>
</template>

<script>
import { usePlayerCriterionStore } from '@/store/playerCriterion.js';
import { mapActions, mapState } from 'pinia';
import CriterionScore from '@/components/CriterionScore.vue';
export default {
	name: 'CriterionBlocks',
	components: {
		CriterionScore
	},
	data() {
		return {
			criterionBlocksData: [],
		};
	},
	methods: {
		...mapActions(usePlayerCriterionStore, [
			'getCriterionList',
			'getPlayerList',
		]),
		goToCriterianBlockPlayer(block) {
			console.log(block);
		},
	},
	computed: {
		...mapState(usePlayerCriterionStore, ['criterionList', 'playerList']),
	},

	mounted() {
		if (!this.criterionList.length) {
			this.getCriterionList();
		}
		this.getPlayerList(
			Number(this.$route.params.gameCode),
			Number(this.$route.params.expertCode)
		);
	},
};
</script>
