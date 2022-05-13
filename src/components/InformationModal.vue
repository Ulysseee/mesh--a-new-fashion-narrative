<template>
	<div class="information">
		<div class="information__close" @click="onClick"></div>

		<Cloth1 />
		<Cloth3 />
	</div>
</template>

<script>
import Cloth1 from './Cloth-1.vue'
import Cloth3 from './Cloth-3.vue'
import Experience from '@classes/Experience'

export default {
	components: {
		Cloth1,
		Cloth3
	},

	mounted() {
		this.experience = new Experience()
	},

	methods: {
		onClick() {
			let info = document.querySelector('.information')
			info.classList.remove('active')

			let cloths = document.querySelectorAll('.cloth')
			cloths.forEach((cloth) => cloth.classList.remove('active'))
			this.experience.infoOpen = false
		}
	}
}
</script>

<style scoped lang="scss">
.information {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 3;
	width: 50%;
	height: 100vh;
	background: #f5efea;
	color: #111111;
	transform: translateX(100%);
	transition: transform 0.9s ease;
	overflow-y: scroll;
	padding: 20px;

	&.active {
		display: block;
		transform: translateX(0%);
	}

	&__close {
		width: 30px;
		height: 30px;
		padding: 30px;
		background: black;
	}
}
</style>
