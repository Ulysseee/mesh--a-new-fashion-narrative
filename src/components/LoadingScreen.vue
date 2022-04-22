<template>
	<div ref="loadingScreen" class="loadingScreen">
		<div class="wrapper">
			<h3 ref="progressUrl" class="progressUrl">
				{{ progressUrl }}
			</h3>
		</div>

		<div class="percent-wrapper">
			<p ref="percent">{{ progress.toFixed(0) }}%</p>
		</div>

		<svg
			class="overlay"
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<path
				ref="overlay__top"
				class="overlay__top"
				vector-effect="non-scaling-stroke"
				d="M 0 0 V 51 Q 50 51 100 51 V 0 z"
			/>
			<path
				ref="overlay__bottom"
				class="overlay__bottom"
				vector-effect="non-scaling-stroke"
				d="M 0 100 V 50 Q 50 50 100 50 V 100 z"
			/>
		</svg>
	</div>
</template>

<script>
import Experience from '../Experience/Experience'
import gsap, { Power3 } from 'gsap'

export default {
	name: 'LoadingScreen',
	data() {
		return {
			progress: 0,
			progressUrl: ''
		}
	},

	mounted() {
		this.experience = new Experience()

		this.experience.resources.on('progress', (percent, path) => {
			this.progress = percent * 100
			this.progressUrl = path
		})

		this.experience.resources.on('ready', () => {
			gsap.timeline()
				.to([this.$refs.progressUrl, this.$refs.percent], {
					y: -85,
					duration: 1.2,
					ease: Power3.easeInOut
				})
				.to(this.$refs.overlay__top, {
					duration: 0.9,
					ease: Power3.easeInOut,
					attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
				})
				.to(this.$refs.overlay__bottom, {
					duration: 0.9,
					ease: Power3.easeInOut,
					delay: -0.9,
					attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
				})
				.to(this.$refs.loadingScreen, {
					css: { opacity: '0', pointerEvents: 'none' },
					ease: Power3.easeOut
				})
		})
	}
}
</script>

<style scoped lang="scss">
.loadingScreen {
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
	align-items: center;
	font-family: 'Mak';

	.overlay {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		overflow: hidden;
	}
	h2 {
		font-size: 30px;
	}
	.progressUrl {
		color: gray;
		font-size: 0.5em;
		letter-spacing: 0.75px;
		z-index: 2;
		overflow: hidden;
		margin: 0;
	}
	.letter {
		display: inline-block;
		will-change: transform;
	}
	.percent-wrapper {
		position: absolute;
		color: gray;
		bottom: 30px;
		font-size: 16px;
		right: 30px;
		margin: 0;
		letter-spacing: 0.5px;
		z-index: 2;
		overflow: hidden;
	}
	&.finished {
		opacity: 0;
		pointer-events: none;
	}
}
</style>
