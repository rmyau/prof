<template>
	<div class="flex justify-content-center mt-8">
		<p-card class="w-5">
			<template #title
				><div style="text-align: center">
					Добро пожаловать!
				</div></template
			>
			<template #content>
				<div class="flex justify-content-center mt-4">
					<div
						class="flex flex-column justify-content-center gap-4 w-6"
					>
						<span class="p-float-label">
							<p-input-text
								id="login"
								v-model="inputLogin"
								class="w-full"
								:class="{ 'p-invalid': invalidData }"
								style="border-radius: 30px"
							></p-input-text>
							<label for="login">Логин</label>
						</span>
						<span class="p-float-label">
							<p-input-text
								id="password"
								v-model="inputPassword"
								class="w-full"
								:class="{ 'p-invalid': invalidData }"
								style="border-radius: 30px"
							></p-input-text>
							<label for="password">Пароль</label>
						</span>
						<div class="mt-3 flex flex-column">
							<p-button
								label="Войти"
								style="border-radius: 30px"
								@click="goNext()"
							></p-button>
							<div
								class="p-error w-full flex justify-content-center"
							>
								<small v-if="invalidData"
									>Неверный логин или пароль</small
								>
							</div>
						</div>
					</div>
				</div>
			</template>
		</p-card>
	</div>
</template>

<script>
import { useExpertStore } from '@/store/expert.js';
import { mapActions, mapState } from 'pinia';
export default {
	name: 'AuthExpert',
	data() {
		return {
			inputPassword: '',
			inputLogin: '',
			invalidData: false,
		};
	},
	methods: {
		async goNext() {
			await this.getUser(this.inputLogin, this.inputPassword);
			if (this.code) {
				this.$router.push('games/' + this.code);
			} else this.invalidData = true;
		},
		...mapActions(useExpertStore, ['getUser']),
	},
	computed: {
		...mapState(useExpertStore, ['code']),
	},
};
</script>
