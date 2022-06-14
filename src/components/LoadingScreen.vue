<template>
	<div ref="loadingScreen" class="loader">
		<div ref="progress" class="loader__progress">
			<div ref="progressBar" class="loader__bar"></div>
			<div ref="percent" class="loader__percent">
				{{ progress.toFixed(0) }}%
			</div>
		</div>

		<h1 class="loader__title">
			<div ref="titleTop"><span>Mesh</span>: A new</div>
			<div ref="titleBottom">fashion narrative</div>
		</h1>

		<h2 class="loader__subtitle">
			<div ref="subtitleTop">Une exploration approfondie des enjeux</div>
			<div ref="subtitleBottom">de nos modes de consommation</div>
		</h2>

		<h3 ref="paragraph" class="loader__paragraph">
			Projet de gallerie interractive de fin d'année, Gobelins 2022.
		</h3>

		<button ref="button" class="loader__enterCta">
			<svg class="progress" fill="none" viewBox="0 0 82 82">
				<circle stroke-width="0.5px" r="40" cx="41" cy="41" />
			</svg>

			<div>Enter the experience</div>
		</button>

		<img
			class="loader__logo"
			src="/assets/img/mesh.svg"
			draggable="false"
		/>
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
			const tl = gsap
				.timeline()
				.to(this.$refs.progress, {
					duration: 0.8,
					opacity: 0,
					ease: Power3.easeInOut
				})
				.to(this.$refs.titleTop, {
					duration: 3,
					opacity: 1,
					x: 0,
					ease: Power3.easeOut
				})
				.to(this.$refs.titleBottom, {
					duration: 3,
					opacity: 1,
					x: 0,
					delay: -3,
					ease: Power3.easeOut
				})
				.to(this.$refs.titleTop, {
					duration: 2,
					opacity: 0,
					x: 640,
					delay: -0.75,
					ease: Power3.easeIn
				})
				.to(this.$refs.titleBottom, {
					duration: 2,
					opacity: 0,
					x: -600,
					delay: -2,
					ease: Power3.easeIn
				})
				.to(
					[
						this.$refs.subtitleTop,
						this.$refs.subtitleBottom,
						this.$refs.paragraph
					],
					{
						duration: 0.8,
						opacity: 1,
						y: -15,
						stagger: 0.15,
						delay: 0.85,
						ease: Power3.easeInOut
					}
				)
			this.ready = true
			tl.to(this.$refs.button, {
				opacity: 1,
				duration: 0.6,
				// delay: -0.4,
				ease: Power3.easeInOut
			})
		})

		this.duration = 1500

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
			this.button.classList.add('complete')

			gsap.timeline({
				onComplete: () => {
					this.experience.isLoading = false
				}
			})
				.to(
					[
						this.$refs.subtitleTop,
						this.$refs.subtitleBottom,
						this.$refs.paragraph
					],
					{
						duration: 0.8,
						opacity: 0,
						stagger: 0.15,

						ease: Power3.easeInOut
					}
				)
				.to(this.$refs.button, {
					opacity: 0,
					duration: 0.6,
					delay: -0.4,
					ease: Power3.easeInOut
				})
				.to(this.$refs.loadingScreen, {
					css: { opacity: '0', pointerEvents: 'none' },
					duration: 1.5,
					delay: -0.3,
					ease: Power3.easeIn
				})

			// .to(this.experience.camera.instance.position, {
			// 	delay: -1.25,
			// 	duration: 3,
			// 	z: 9,
			// 	ease: Power3.easeOut
			// })

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
		background: #cecbc6;

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

	.loader__title {
		// font-family: 'History Pro';
		font-family: 'Brilliant Cut Pro';
		text-transform: uppercase;

		text-align: center;
		font-size: 4rem;
		line-height: 4.5rem;
		position: absolute;
		div {
			opacity: 0;
		}

		div:first-child {
			transform: translate(-540px);
		}
		div:last-child {
			transform: translate(500px);
		}
	}

	.loader__subtitle {
		// width: 47%;
		position: absolute;
		top: 11rem;
		// font-family: 'History Pro';
		font-family: 'Brilliant Cut Pro';
		text-transform: uppercase;

		text-align: center;
		font-size: 1.75rem;
		line-height: 2.5rem;

		div {
			opacity: 0;
		}
		// div:first-child {
		// 	// transform: translateX(-17.6%);
		// 	text-align: left;
		// }
		// div:last-child {
		// 	// transform: translateX(-17.6%);
		// 	text-align: right;
		// }
	}

	.loader__paragraph {
		width: 18%;
		position: absolute;
		top: 18rem;
		font-family: 'Brilliant Cut Pro Regular';
		text-align: center;
		font-size: 0.825rem;
		line-height: 1.25rem;
		opacity: 0;
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
		position: relative;
		bottom: 0;
		// left: 50%;
		// transform: translate(-50%, 50%);
		// transform: translateY(-50%);
		width: 150px;
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;

		&::after,
		&:before {
			content: '';
			border: 1px solid rgba(50, 50, 50, 0.1);
			border-radius: 50%;
			display: block;
			position: absolute;
		}

		&::after {
			left: 50%;
			top: 49.5%;
			width: 98%;
			height: 98%;
			transform: translate(-50%, -50%);
			transition: transform 0.5s cubic-bezier(0.08, 0.57, 0.44, 0.91);
		}

		&::before {
			width: 85%;
			height: 85%;
			background-color: transparent;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			opacity: 0.5;
			transition: transform 0.5s cubic-bezier(0.08, 0.57, 0.44, 0.91),
				border-color 0.5s cubic-bezier(0.08, 0.57, 0.44, 0.91),
				background-color 0.5s cubic-bezier(0.08, 0.57, 0.44, 0.91);
			z-index: -1;
		}

		&:hover {
			&::before {
				background-color: #fff;
				border-color: #fff;
			}
		}

		svg {
			stroke: #323232;
			stroke-opacity: 0.8;
			height: 100%;
			width: 100%;
			pointer-events: none;
			position: absolute;
			transform: rotate(-90deg);
			transition: transform 0.5s cubic-bezier(0.08, 0.57, 0.44, 0.91);

			circle {
				stroke-dasharray: 251.327, 251.327;
				stroke-dashoffset: 251.327;
				transform-origin: center;
				transition: stroke-dashoffset ease 1.6s;

				// stroke-dasharray: 1.1;
				// stroke-dashoffset: 0;
			}
		}

		div {
			position: absolute;
			font-size: 0.825rem;
		}
	}

	.loader__enterCta.process {
		circle {
			stroke-dashoffset: 0;
		}
	}

	.loader__enterCta.complete {
		circle {
			stroke-dashoffset: 1.5;
		}
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

	.loader__logo {
		position: absolute;
		top: 3rem;
		width: 250px;
		height: auto;

		filter: drop-shadow(5px 5px 15px rgba(100, 100, 111, 0.2));
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
