<template>
	<div ref="loadingScreen" class="loader">
		<div class="loader__progressUrl">
			<span ref="progressUrl">{{ progressUrl }}</span>
		</div>

		<div class="loader__percent">
			<p ref="percent">{{ progress.toFixed(0) }}%</p>
		</div>

		<div class="loader__warning">
			<span v-for="letter in warning" ref="warning" :key="letter">
				{{ letter }}
			</span>
		</div>

		<button ref="button" class="loader__enterCta" @click="launch">
			Explore
		</button>

		<svg
			class="loader__overlay"
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<path
				ref="overlayTop"
				vector-effect="non-scaling-stroke"
				d="M 0 0 V 51 Q 50 51 100 51 V 0 z"
			/>
			<path
				ref="overlayBottom"
				vector-effect="non-scaling-stroke"
				d="M 0 100 V 50 Q 50 50 100 50 V 100 z"
			/>
		</svg>
	</div>
</template>

<script>
import SoundClass from '@classes/SoundClass'

import Experience from '../Experience/Experience'
import gsap, { Power3 } from 'gsap'

export default {
	name: 'LoadingScreen',
	data() {
		return {
			progress: 0,
			progressUrl: '',
			ready: false,
			initFlag: false,
			warning: ['Experience', 'is', 'loading']
		}
	},

	mounted() {
		this.experience = new Experience()
		this.audio = new SoundClass('/assets/music.mp3')

		this.experience.resources.on('progress', (percent, path) => {
			this.progress = percent * 100
			this.progressUrl = path
		})

		console.log(this.$refs.warning)

		this.experience.resources.on('ready', () => {
			const tl = gsap.timeline()
			tl.to(this.$refs.warning, {
				y: -85,
				duration: 1.2,
				stagger: {
					each: 0.2
				},
				ease: Power3.easeInOut
			})
			tl.to([this.$refs.progressUrl, this.$refs.percent], {
				y: -85,
				duration: 1.2,
				delay: -0.5,
				ease: Power3.easeInOut
			})

			setTimeout(() => {
				this.ready = true

				tl.to(this.$refs.button, {
					opacity: 1,
					duration: 0.8,
					ease: Power3.easeInOut
				})
			}, 1000)
		})
	},

	methods: {
		launch() {
			gsap.timeline()
				.to(this.$refs.button, {
					opacity: 0,
					duration: 0.8,
					ease: Power3.easeInOut
				})
				.to(this.$refs.overlayTop, {
					duration: 0.9,
					ease: Power3.easeInOut,
					attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
				})
				.to(this.$refs.overlayBottom, {
					duration: 0.9,
					ease: Power3.easeInOut,
					delay: -0.9,
					attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
				})
				.to(this.$refs.loadingScreen, {
					css: { opacity: '0', pointerEvents: 'none' },
					ease: Power3.easeOut
				})

			if (!this.initFlag) {
				this.audio.init()
				this.initFlag = true
				this.audio.play()
			}
		}
	}
}
</script>

<style scoped lang="scss">
.loader {
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	color: white;
	font-size: 2em;
	transition: opacity 0.5s;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: 'Panamera';

	.loader__enterCta {
		opacity: 0;
		color: #fff;
		font-family: 'Panamera';

		font-size: 1rem;
		padding: 10px 18px 12px;
		background: transparent;
		border: none;
		border-radius: px;
		text-transform: uppercase;
		text-align: center;
		z-index: 2;
		position: absolute;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
	}

	.loader__overlay {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.loader__progressUrl {
		color: gray;
		font-size: 0.5em;
		z-index: 2;
		overflow: hidden;
		margin: 0;
		padding: 2px 0;

		span {
			display: block;
		}
	}
	.loader__percent,
	.loader__warning {
		overflow: hidden;
		z-index: 2;
		position: absolute;
		font-size: 1rem;
		color: gray;
		padding: 4px 0;

		p {
			margin: 0;
		}
	}
	.loader__percent {
		left: 50%;
		bottom: 4rem;
		transform: translateX(-50%);
	}
	.loader__warning {
		left: 50%;
		bottom: 2rem;
		transform: translateX(-50%);
		display: flex;

		span {
			display: block;
			padding: 0 2px;
			will-change: transform;
		}
	}
}
</style>
