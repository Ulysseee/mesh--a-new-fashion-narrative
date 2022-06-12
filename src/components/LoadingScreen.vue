<template>
	<div ref="loadingScreen" class="loader">
		<div ref="progress" class="loader__progress">
			<div ref="progressBar" class="loader__bar"></div>
			<div ref="percent" class="loader__percent">
				{{ progress.toFixed(0) }}%
			</div>
		</div>

		<button ref="button" class="loader__enterCta">
			<svg class="progress" viewBox="0 0 32 32">
				<circle r="8" cx="16" cy="16" />
			</svg>
			Enter the experience
		</button>
	</div>
</template>

<script>
import SoundClass from '@classes/SoundClass'

import Experience from '../Experience/Experience'
import gsap, { Power2, Power3 } from 'gsap'

export default {
	name: 'LoadingScreen',
	data() {
		return {
			progress: 0,
			progressUrl: '',
			ready: false,
			initFlag: false
		}
	},

	mounted() {
		this.experience = new Experience()
		this.audio = new SoundClass('/assets/music.mp3')
		this.button = document.querySelector('.loader__enterCta')

		this.experience.resources.on('progress', (percent, path) => {
			this.progress = percent * 100
			this.progressUrl = path
		})

		this.experience.resources.on('ready', () => {
			const tl = gsap.timeline().to(this.$refs.progress, {
				duration: 0.8,
				opacity: 0,
				ease: Power3.easeInOut
			})
			this.ready = true
			tl.to(this.$refs.button, {
				opacity: 1,
				duration: 0.8,
				delay: -0.5,
				ease: Power3.easeInOut
			})
		})

		this.duration = 1400

		this.button.addEventListener(
			'mousedown',
			() => {
				if (!this.button.classList.contains('process')) {
					this.button.classList.add('process')
					this.button.timeout = setTimeout(
						this.launch.bind(this),
						this.duration,
						this.button
					)
				}
			},
			false
		)
		;['mouseup', 'mouseout'].forEach((e) => {
			this.button.addEventListener(
				e,
				() => {
					this.button.classList.remove('process')
					clearTimeout(this.button.timeout)
				},
				false
			)
		})
	},

	methods: {
		launch() {
			gsap.timeline({
				onComplete: () => {
					this.experience.isLoading = false
				}
			})
				.to(this.$refs.button, {
					opacity: 0,
					duration: 0.8,
					ease: Power3.easeOut
				})

				.to(this.$refs.loadingScreen, {
					css: { opacity: '0', pointerEvents: 'none' },
					duration: 1.5,
					delay: -0.75,
					ease: Power3.easeIn
				})
				.to(this.experience.camera.instance.position, {
					delay: -1.25,
					duration: 3,
					z: -10
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
	z-index: 100;
	color: #323232;
	background: #f4f1eb;
	font-size: 2em;
	transition: opacity 0.5s;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: 'Brilliant Cut Pro Regular';

	&.progress {
		width: 20px;
		height: 20px;
		transform: rotate(-90deg) scale(var(--progress-scale, 1));
		transition: transform 0.5s ease;
		circle {
			stroke-dashoffset: 1;
			stroke-dasharray: var(--progress-array, 0) 52;
			stroke-width: 16;
			stroke: var(--progress-active);
			transition: stroke-dasharray var(--duration) linear;
		}
	}

	.loader__progress {
		width: 10rem;
		position: absolute;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loader__bar {
		width: 100%;
		height: 2px;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 2px;
			background: #323232;
			animation: loading 1s ease-in-out infinite alternate;
		}
	}

	.loader__percent {
		font-size: 0.725rem;
		padding: 4px 0;
		margin-top: 1rem;
		text-transform: uppercase;
	}

	.loader__enterCta {
		opacity: 0;
		color: #323232;
		font-size: 1rem;
		padding: 10px 18px 12px;
		background: transparent;
		border: none;
		text-transform: uppercase;
		text-align: center;
		z-index: 2;
		position: absolute;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
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
		font-size: 0.625rem;

		span {
			display: block;
			padding: 0 2px;
			will-change: transform;
		}
	}
}

@keyframes loading {
	0% {
		transform: translate(-100%);
	}
	to {
		transform: translate(100%);
	}
}
</style>
