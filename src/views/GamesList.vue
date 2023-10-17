<template>
    <div class="m-3">
        <div class="text-2xl ml-5 mt-5 font-semibold">Игры</div>
        <div class="flex flex-column justify-content-start align-items-start ml-3 mt-3">
            <p-button
                v-for="game in games"
                :key="game.id"
                text
                :label="game.name"
                class="w-auto text-lg"
                @click="chooseGame(game)"
            ></p-button>
        </div>
    </div>
</template>
<script>
import { useExpertGamesStore } from '@/store/games.js'
import { useComandPlayersStore } from '@/store/comandPlayers.js'
import { mapActions, mapState } from 'pinia'
export default {
    name: 'GamesList',
    methods: {
        ...mapActions(useExpertGamesStore, ['getGames']),
        ...mapActions(useComandPlayersStore, ['getComandId']),
        async chooseGame(game) {
            const comandId = await this.getComandId(game.id, Number(this.$route.params.expertLogin))
            this.$router.push({ path: '/comand/' + comandId })
        },
    },
    computed: {
        ...mapState(useExpertGamesStore, ['games']),
    },
    mounted() {
        if (!this.games.length) {
            this.getGames()
        }
    },
}
</script>
