<template>
	<p-toolbar
		v-if="$route.name !== 'auth'"
		style="border-bottom: 1px solid rgb(96, 24, 163); border-radius: 0%"
	>
		<template #end>
			<p-avatar
				icon="pi pi-user"
				class="mr-2"
				shape="circle"
			></p-avatar>
			<span>{{ name }}</span>
		</template>
	</p-toolbar>
	<router-view></router-view>
</template>

<script>
import { useExpertStore } from '@/store/expert.js';
import { mapState } from 'pinia';
export default {
	name: 'App',
	computed: {
		...mapState(useExpertStore, ['login', 'name', 'code']),
	},
	mounted() {
		// if (!this.code) {
		// 	this.$router.push({ path: '/' });
		// }
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
