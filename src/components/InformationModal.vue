<template>
	<div class="information" data-scroll-container>
		<div class="information__wrapper" data-scroll-section>
			<div class="information__close" @click="onClick">
				<svg
					data-v-1df393ed=""
					width="90"
					height="86"
					viewBox="0 0 90 86"
					xmlns="http://www.w3.org/2000/svg"
					class=""
				>
					<path
						d="M48.923 33.796c1.272-1.176 2.184-1.968 2.736-2.376.552-.432 1.02-.648 1.404-.648.36 0 .756.18 1.188.54.48.384.72.9.72 1.548 0 .432-.228.924-.684 1.476-.432.528-1.62 1.752-3.564 3.672-2.856 2.808-4.284 4.356-4.284 4.644 0 .24.468 1.068 1.404 2.484a53.79 53.79 0 002.628 3.672c.768.936 1.152 1.668 1.152 2.196 0 .408-.18.828-.54 1.26-.36.48-.888.72-1.584.72-.504 0-.984-.168-1.44-.504-.408-.288-1.32-1.44-2.736-3.456-1.368-1.944-2.1-2.916-2.196-2.916-.12 0-.312.216-.576.648-.264.408-.396.708-.396.9 0 .312-.192.66-.576 1.044-.456.456-.984.684-1.584.684-.456 0-.864-.144-1.224-.432-.36-.288-.588-.684-.684-1.188a.276.276 0 00-.036-.108v-.108c0-.528.24-1.284.72-2.268.504-1.008 1.068-1.884 1.692-2.628.36-.48.54-.852.54-1.116 0-.432-.576-1.812-1.728-4.14-.888-1.68-1.332-2.784-1.332-3.312 0-.408.228-.84.684-1.296.48-.456.924-.684 1.332-.684.552 0 1.068.264 1.548.792s1.032 1.416 1.656 2.664c.744 1.536 1.296 2.304 1.656 2.304.168 0 .348-.168.54-.504.144-.264 1.332-1.452 3.564-3.564z"
					></path>
				</svg>
			</div>

			<Cloth1 />
			<Cloth2 />
			<Cloth3 />
			<Cloth4 />
			<Cloth5 />
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

			this.experience.parallax.active = false
			this.experience.infoOpen = false
			this.experience.camera.resetPosition()
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
	width: 40%;
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
		width: 70px;
		height: 70px;
		background: black;
		display: inline-block;
		position: relative;
		margin-left: 80%;
		z-index: 200000;
		cursor: pointer;
		border-radius: 50%;

		svg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			fill: white;
		}
	}
}
</style>
