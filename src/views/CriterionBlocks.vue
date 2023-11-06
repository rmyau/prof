<template>
	<div>
		<div
			v-for="criterionBlock of criterionList"
			:key="criterionBlock.blockId"
			class="m-3"
		>
			<span class="text-xl text-900 font-bold p-2">{{
				criterionBlock.nameCriterionBlock
			}}</span>
			<div
				v-for="criterion of criterionBlock.criterion"
				:key="criterion.id"
				class="p-2"
			>
				<div
					class="text-l text-900 font-bold p-2"
					style="background-color: rgb(209, 185, 231)"
				>
					{{ criterion.name }}
				</div>
				<criterion-score
					:criterion-code="criterion.id"
					:player-list="this.playerList"
				></criterion-score>
			</div>
		</div>
	</div>
</template>

<script>
import CriterionScore from '@/components/CriterionScore.vue';
import { usePlayerCriterionStore } from '@/store/playerCriterion.js';
import { mapActions, mapState } from 'pinia';
export default {
	name: 'CriterionBlocks',
	components: {
		CriterionScore,
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
			'getPlayersScoreData',
		]),
	},
	computed: {
		...mapState(usePlayerCriterionStore, [
			'criterionList',
			'playerList',
			'playersScoreData',
		]),
	},

	async mounted() {
		if (!this.criterionList.length) {
			this.getCriterionList();
		}
		await this.getPlayersScoreData(
			Number(this.$route.params.gameCode),
			Number(this.$route.params.expertCode)
		);
	},
};
</script>
