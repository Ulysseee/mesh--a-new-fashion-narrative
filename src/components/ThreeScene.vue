<template>
	<div class="threeScene">
		<canvas ref="container" class="container"></canvas>
	</div>

	<div class="loading"></div>

	<svg
		class="cursor cursor--1"
		width="12"
		height="12"
		viewBox="0 0 12 12"
		data-scale-enter="12"
		data-opacity-enter="1"
	>
		<circle class="cursor__inner" cx="6" cy="6" r="3"></circle>
	</svg>
	<svg
		class="cursor cursor--2"
		width="72"
		height="72"
		viewBox="0 0 72 72"
		data-scale-enter="0.75"
		data-opacity-enter="0"
		data-amt="0.15"
	>
		<circle class="cursor__inner" cx="36" cy="36" r="16"></circle>
	</svg>
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

.cursor {
	display: none;
}

@media (any-pointer: fine) {
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		pointer-events: none;
		z-index: 10000;
	}

	.cursor--1 .cursor__inner {
		fill: #96776e;
	}

	.cursor--2 .cursor__inner {
		fill: none;
		stroke: #96776e;
		stroke-width: 1px;
	}

	.no-js .cursor {
		display: none;
	}
}
</style>
