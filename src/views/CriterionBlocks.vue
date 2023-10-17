<template>
    <div class="flex gap-4 align-items-center mt-3">
        <p-button icon="pi pi-arrow-left" label="Назад к участникам" class="text-xl" @click="$router.go(-1)"></p-button>
        <div>Имя участника</div>
    </div>
    <div class="m-3">
        <div class="text-2xl font-semibold">Выберите блок</div>
        <div class="flex flex-row justify-content-around m-3">
            <div v-for="block in criterionBlocksData" :key="block.id">
                <p-button text :label="block.nameCriterionBlock" class="text-xl" @click="goToCriterianBlockPlayer(block)"></p-button>
                <div v-for="criterion in block.criterion" :key="criterion.id" style="text-align: center" class="m-1">
                    {{ criterion.name }}
                </div>
            </div>
        </div>
    </div>
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
