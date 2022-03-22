<template>
	<div class="threeScene">
		<div ref="container" class="container" />
	</div>

	<div class="music" @click="togglePlay">MUSIC ON/OFF</div>
</template>

<script>
import MainThreeScene from '@classes/MainThreeScene'
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
		Audio.init()
		MainThreeScene.init(this.$refs.container)
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
</style>
