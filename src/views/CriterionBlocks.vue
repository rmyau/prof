<template>
    <div>123</div>
</template>

<script>
import { GameData } from '@/service/GameData'
export default {
    name: 'CriterionBlocks',
    data() {
        return {
            criterionBlocksData: [],
        }
    },
    methods: {
        goToCriterianBlockPlayer(block) {
            console.log(block)
        },
    },

    mounted() {
        this.criterionBlocksData = GameData.getExpertCriterion()
    },
}
</script>
