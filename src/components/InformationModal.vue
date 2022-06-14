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
					d="M 100 0 L 100 100 L 100 100 Q 100 50 100 0 Z"
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
import Cloth1 from './Clothes/Cloth-1.vue'
import Cloth2 from './Clothes/Cloth-2.vue'
import Cloth3 from './Clothes/Cloth-3.vue'
import Cloth4 from './Clothes/Cloth-4.vue'
import Cloth5 from './Clothes/Cloth-5.vue'

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
			this.experience.anims.hideInfoModal()
			this.experience.parallax.active = false

			this.experience.closeSound.play()

			this.experience.lastScrollTime = new Date().getTime()
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
	z-index: -1;
	bottom: 0px;
	right: 0px;

	width: 55vw;
	overflow: hidden;
	padding: 0;
	margin: 0;
	// color: #fff;
	color: #000;
	transition: transform 0.8s ease-in;
	display: flex;
	flex-direction: column;

	font-family: 'PP Telegraf Light';

	// &.active {
	// 	display: block;
	// 	transform: translateX(0%);
	// }

	&__container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	&__overlay {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
		top: 0;
		fill: #f4f1eb;
		// fill: rgba(0, 0, 0, 0.4);
		left: 0;
	}

	&__close {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #323232;
		transition: background 200ms ease-in;
		margin: 2rem 0 15px;
		// border: 4px solid black;
		position: relative;
		opacity: 0;

		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	width: calc(100% + 10px);
		// 	height: calc(100% + 10px);
		// 	top: calc(-50% + 1px);
		// 	left: calc(-50% + 1px);
		// 	background: white;
		// 	border-radius: 50%;
		// 	z-index: -1;
		// 	transition: opacity 200ms ease-in;
		// }

		&:hover {
			// background-color: rgba(255, 255, 255, 0.4);
			background-color: rgba(0, 0, 0, 0.4);
		}
	}

	&__wrapper {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		z-index: 10000000;
		position: absolute;
		padding: 0 30px 4rem;
		width: 100%;
		height: 100%;
	}
}
</style>
