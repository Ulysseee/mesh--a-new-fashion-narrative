<template>
	<div class="threeScene">
		<canvas ref="container" class="container"></canvas>
	</div>

	<div class="loading"></div>
</template>

<script>
import Experience from '@classes/Experience'
export default {
	name: 'ThreeScene',
	props: {
		msg: String
	},

	mounted() {
		new Experience(this.$refs.container)
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
