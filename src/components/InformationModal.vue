<template>
	<div class="information" data-scroll-container>
		<div class="information__wrapper" data-scroll-section>
			<div class="information__close" @click="onClick"></div>

			<Cloth1 />
			<Cloth3 />
		</div>
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
			// CLOSE MODAL
			document.querySelector('.information').classList.remove('active')

			document
				.querySelectorAll('.cloth')
				.forEach((cloth) => cloth.classList.remove('active'))

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
	padding: 20px;

	&.active {
		display: block;
		transform: translateX(0%);
	}

	&__wrapper {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	&__close {
		width: 30px;
		height: 30px;
		padding: 30px;
		background: red;
		display: block;
		z-index: 2;
		cursor: pointer;
	}
}
</style>
