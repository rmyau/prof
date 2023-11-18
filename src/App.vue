<template>
	<p-toolbar
		v-if="$route.name !== 'auth'"
		style="border-bottom: 2px solid #d1b9e7"
	>
		<template #end>
			<p-avatar
				icon="pi pi-user"
				class="mr-2"
				shape="circle"
			></p-avatar>
			<span>{{ name }}</span>
		</template>
		<template #start>
			<div v-if="isAdmin">
				<p-button
					icon="pi pi-bars"
					text
					@click="visibleMenu = true"
				></p-button>
			</div>
		</template>
	</p-toolbar>
	<p-sidebar v-model:visible="visibleMenu">
		<h2 class="flex justify-content-center">Меню</h2>
		<ul class="list-none p-0 m-0 overflow-hidden">
			<li>
				<a
					class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
				>
					<i class="pi pi-calendar-times mr-2"></i>
					<span class="font-medium">Игры</span>
				</a>
			</li>
		</ul>
	</p-sidebar>
	<router-view></router-view>
</template>

<script>
import { useExpertStore } from '@/store/expert.js';
import { mapState } from 'pinia';
export default {
	name: 'App',
	data() {
		return {
			visibleMenu: false,
		};
	},
	computed: {
		...mapState(useExpertStore, ['login', 'name', 'code', 'isAdmin']),
	},
	mounted() {
		// if (!this.code) {
		// 	this.$router.push({ path: '/' });
		// }
	},
};
</script>

<style>
body {
	margin: 0;
	padding: 0;
	background-color: #f0f0f0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
