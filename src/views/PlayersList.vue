<template>
    <div class="flex gap-4 align-items-center mt-3">
        <p-button icon="pi pi-arrow-left" label="Назад" class="text-xl" @click="$router.go(-1)"></p-button>
        <div class="text-2xl font-semibold">Участники</div>
    </div>

    <div class="flex flex-column justify-content-start align-items-start ml-4 mt-3">
        <p-button
            v-for="player in playerList"
            :key="player.id"
            text
            :label="player.name"
            class="w-auto text-lg"
            @click="goToCriterion(player)"
        ></p-button>
    </div>
</template>
<script>
import { useComandPlayersStore } from '@/store/comandPlayers.js'
import { mapActions, mapState } from 'pinia'
export default {
    name: 'PlayersList',
    methods: {
        ...mapActions(useComandPlayersStore, ['getPlayers']),
        goToCriterion(player){
            this.$router.push({path: '/player/'+player.id})
        }
    },
    computed: {
        ...mapState(useComandPlayersStore, ['playerList']),
    },
    mounted() {
        if (!this.playerList.length) {
            this.getPlayers()
        }
    },
}
</script>
