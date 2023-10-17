import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:catchAll(.*)',
            redirect: '/',
        },
        {
            path: '/',
            name: 'auth',
            component: () => import('@/views/AuthExpert.vue'),
        },
        {
            path: '/games/:expertLogin',
            name: 'games',
            component: () => import('@/views/GamesList.vue'),
        },
        {
            path: '/comand/:comandId',
            name: 'comandPlayers',
            component: () => import('@/views/PlayersList.vue'),
        },
        {
            path: '/player/:playerId',
            name: 'playerCriterionBlocks',
            component: () => import('@/views/CriterionBlocks.vue'),
        }
    ],
})
export default router
