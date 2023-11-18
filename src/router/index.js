import { createRouter, createWebHashHistory } from 'vue-router';
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
			path: '/games/:expertCode',
			name: 'games',
			component: () => import('@/views/GamesList.vue'),
		},
		{
			path: '/evaluation/:expertCode/:gameCode',
			name: 'evaluation',
			component: () => import('@/views/CriterionBlocks.vue'),
		},
		{
			path: '/admin/games',
			name: 'admin-games',
			component: () => import('@/views/Administrating/Games.vue'),
		},
	],
});
export default router;
