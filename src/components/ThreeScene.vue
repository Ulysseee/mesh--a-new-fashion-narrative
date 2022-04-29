<template>
	<div class="threeScene">
		<canvas ref="container" class="container"></canvas>
	</div>

	<div class="loading"></div>
	<div class="circle-cursor circle-cursor--inner"></div>
	<div class="circle-cursor circle-cursor--outer"></div>
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

.circle-cursor {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 2000;
	pointer-events: none;
	border-radius: 50%;
	&--outer {
		width: 30px;
		height: 30px;
		border: 1px solid yellow;
		z-index: 12000;
		opacity: 0.2;
	}
	&--inner {
		width: 5px;
		height: 5px;
		left: -2.5px;
		top: -2.5px;
		z-index: 11000;
		background: yellow;
	}
}
</style>
