<template>
	<div class="threeScene">
		<canvas ref="container" class="container"></canvas>
	</div>

	<div class="loading"></div>

	<div class="music" @click="togglePlay">MUSIC ON/OFF</div>
</template>

<script>
import Experience from '@classes/Experience'
import Audio from '@classes/Audio'
export default {
	name: 'ThreeScene',
	props: {
		msg: String
	},

	data() {
		return {
			initFlag: false,
			playFlag: false
		}
	},
	mounted() {
		new Experience(this.$refs.container)
	},

	methods: {
		togglePlay() {
			if (!this.initFlag) {
				Audio.init()
				this.initFlag = true
			}
			if (!this.playFlag) {
				Audio.play()
				this.playFlag = true
			} else {
				Audio.pause()
				this.playFlag = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
.music {
	z-index: 2;
	background-color: red;
	position: absolute;
	bottom: 0;
	right: 0;
}
.loading {
	width: 100vw;
	height: 100vh;
	opacity: 0;
	position: absolute;
	background: white;
	top: 0;
	left: 0;
	z-index: 100;
	pointer-events: none;
}
</style>
