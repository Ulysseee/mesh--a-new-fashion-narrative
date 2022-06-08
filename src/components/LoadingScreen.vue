<template>
	<div ref="loadingScreen" class="loader">
		<div class="loader__warning">
			<span v-for="letter in warning" ref="warning" :key="letter">
				{{ letter }}
			</span>
		</div>

		<div ref="progress" class="loader__progress">
			<div ref="progressBar" class="loader__bar"></div>
			<div ref="percent" class="loader__percent">
				{{ progress.toFixed(0) }}%
			</div>
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
				ref="overlay"
				vector-effect="non-scaling-stroke"
				d="M 0 100 V 0 Q 50 0 100 0 V 100 z"
			/>
		</svg>
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
			initFlag: false,
			warning: ['Loading', 'virtual', 'experience', '...']
		}
	},

	mounted() {
		this.experience = new Experience()
		this.audio = new SoundClass('/assets/music.mp3')

		this.experience.resources.on('progress', (percent, path) => {
			this.progress = percent * 100
			this.progressUrl = path
		})

		this.experience.resources.on('ready', () => {
			const tl = gsap.timeline()
			tl.to(this.$refs.warning, {
				y: '-115%',
				stagger: {
					each: 0.1
				},
				ease: Power2.easeIn
			}).to(this.$refs.progress, {
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
	},

	methods: {
		launch() {
			gsap.timeline()
				.to(this.$refs.button, {
					opacity: 0,
					duration: 0.8,
					ease: Power3.easeOut
				})
				.to(this.$refs.overlay, {
					duration: 1.1,
					ease: Power3.easeInOut,
					attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
				})
				.to(this.$refs.loadingScreen, {
					css: { opacity: '0', pointerEvents: 'none' },
					duration: 0.5,
					delay: -0.5,
					ease: Power3.easeIn
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
	color: var(--c-white);
	font-size: 2em;
	transition: opacity 0.5s;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: 'Brilliant Cut Pro Regular';

	.loader__progress {
		width: 5rem;
		position: absolute;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loader__bar {
		width: 100%;
		height: 1px;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 1px;
			background: white;
			animation: loading 1s ease-in-out infinite alternate;
		}
	}

	.loader__percent {
		font-size: 0.625rem;
		padding: 4px 0;
		margin-top: 1rem;
		text-transform: uppercase;
	}

	.loader__enterCta {
		opacity: 0;
		color: var(--c-white);

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
	.loader__warning {
		overflow: hidden;
		z-index: 2;
		position: absolute;
		font-size: 0.75rem;
		padding: 4px 0;
		text-transform: uppercase;

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
