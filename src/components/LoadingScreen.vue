<template>
	<div ref="loadingScreen" class="loadingScreen">
		<div class="wrapper">
			<h2>Loading</h2>
			<p class="loading__description">
				Loading different textures and models
			</p>
			<div class="progressBar">
				<div
					class="progressFill"
					:style="{ maxWidth: `${progress}%`, width: `${progress}%` }"
				></div>
			</div>
			<div class="progressUrl">{{ progressUrl }}</div>
		</div>

		<p class="percent">{{ progress.toFixed(0) }}%</p>
	</div>
</template>

<script>
import Experience from '../Experience/Experience'

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
			setTimeout(() => {
				this.$refs.loadingScreen.classList.add('finished')
			}, 1000)
		})
	}
}
</script>

<style scoped lang="scss">
.loadingScreen {
	width: 100vw;
	height: 100vh;
	background: #151515;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	color: white;
	font-size: 2em;
	transition: opacity 0.5s;
	display: flex;
	align-items: center;

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
	}
	h2 {
		font-size: 30px;
	}
	.loading__description {
		font-size: 16px;
	}
	.progressBar {
		width: 500px;
		height: 5px;
		background: black;
		border-radius: 30px;
		margin: 20px 0;
	}
	.progressUrl {
		color: gray;
		margin-top: 20px;
		font-size: 0.5em;
		height: 25px;
	}
	.progressFill {
		width: 0%;
		height: 100%;
		background: #bc13fe;
		transition: all 0.3s;
		border-radius: 30px;
	}
	.percent {
		position: absolute;
		color: gray;
		bottom: 40px;
		font-size: 16px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	&.finished {
		opacity: 0;
		pointer-events: none;
	}
}
</style>
