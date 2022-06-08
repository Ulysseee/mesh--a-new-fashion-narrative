<template>
	<div class="information" data-scroll-container>
		<div class="information__container">
			<svg
				class="information__overlay"
				width="100%"
				height="100%"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				<path
					class="information__overlay__path"
					vector-effect="non-scaling-stroke"
					d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
				/>
			</svg>

			<div class="information__wrapper" data-scroll-section>
				<div class="information__close" @click="onClick"></div>

				<Cloth1 />
				<Cloth2 />
				<Cloth3 />
				<Cloth4 />
				<Cloth5 />
			</div>
		</div>
	</div>
</template>

<script>
import Cloth1 from './Cloth-1.vue'
import Cloth2 from './Cloth-2.vue'
import Cloth3 from './Cloth-3.vue'
import Cloth4 from './Cloth-4.vue'
import Cloth5 from './Cloth-5.vue'

import Experience from '@classes/Experience'

export default {
	components: {
		Cloth1,
		Cloth2,
		Cloth3,
		Cloth4,
		Cloth5
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
			this.experience.camera.resetPosition()
		}
	}
}
</script>

<style scoped lang="scss">
.information {
	// background-color: var(--c-transparent);
	height: 100vh;
	position: absolute;
	z-index: 99;
	bottom: 0px;
	right: 0px;
	// backdrop-filter: blur(10px);

	width: 40vw;
	overflow: hidden;
	padding: 0;
	margin: 0;
	color: var(--c-white);
	transform: translateX(100%);
	font-family: 'PP Telegraf Light';
	transition: transform 0.8s ease-in;
	display: flex;
	flex-direction: column;
	padding: 0 10px;

	&.active {
		display: block;
		transform: translateX(0%);
	}

	&__container {
		position: relative;
	}

	&__overlay {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	&__close {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: white;
		transition: all 200ms ease-in;
		margin: 15px 0;
		z-index: 20000;

		&:hover {
			background-color: var(--c-transparent);
		}
	}

	&__wrapper {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		z-index: 10000000;
		background-color: red;
	}
}
</style>
