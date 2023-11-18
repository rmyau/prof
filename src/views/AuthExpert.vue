<template>
	<div class="flex justify-content-center mt-8">
		<p-card class="w-4 block">
			<template #title
				><div style="text-align: center" class="mt-4">
					Добро пожаловать!
				</div></template
			>
			<template #content>
				<div class="flex justify-content-center mt-4">
					<div
						class="flex flex-column justify-content-center gap-4 w-8"
					>
						<span class="p-float-label">
							<p-input-text
								id="login"
								v-model="inputLogin"
								class="w-full btn"
								:class="{ 'p-invalid': invalidData }"
							></p-input-text>
							<label for="login">Логин</label>
						</span>
						<span class="p-float-label">
							<p-password
								id="password"
								v-model="inputPassword"
								class="w-full btn"
								:feedback="false"
								toggleMask
								:class="{ 'p-invalid': invalidData }"
							></p-password>
							<label for="password">Пароль</label>
						</span>
						<div class="mt-3 flex flex-column">
							<p-button
								label="Войти"
								class="w-full btn"
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
import { useExpertStore } from '@/store/expert.js'
import { mapActions, mapState } from 'pinia'
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
				if (this.isAdmin){
					this.$router.push('admin/games');
				}
				else{
					this.$router.push('games/' + this.code);
				}
				
			} else this.invalidData = true;
		},
		...mapActions(useExpertStore, ['getUser']),
	},
	computed: {
		...mapState(useExpertStore, ['code','isAdmin']),
	},
};
</script>
<style scoped>

.block {
	border-radius: 20px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.btn {
	border-radius: 30px;
}

::v-deep(.p-input-icon-right > .p-inputtext ) {
    border-radius: 30px;
	width: 100%;
}

</style>