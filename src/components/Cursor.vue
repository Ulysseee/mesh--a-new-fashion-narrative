<template>
	<svg
		class="cursor star"
		width="18"
		height="12"
		viewBox="0 0 18 12"
		fill="none"
	>
		<path
			d="M9.10023 0.660156C9.10023 5.36016 3.28023 6.11015 0.490234 6.20015H17.6702C9.75023 6.10015 9.10023 0.660156 9.10023 0.660156Z"
			fill="white"
		/>
		<path
			d="M0.490234 6.22021C3.28023 6.31021 9.10023 7.06022 9.10023 11.7602C9.10023 11.7602 9.75023 6.32021 17.6702 6.22021H0.490234Z"
			fill="white"
		/>
	</svg>
	-->

	<svg
		class="cursor cursor--1"
		width="70"
		height="70"
		viewBox="0 0 70 70"
		data-scale-enter="1.5"
		data-opacity-enter="1"
	>
		<circle
			class="cursor__inner"
			pathLength="1"
			cx="35"
			cy="35"
			r="15"
		></circle>
	</svg>

	<svg
		class="cursor cursor--2"
		width="80"
		height="80"
		viewBox="0 0 80 80"
		data-scale-enter="1.5"
		data-opacity-enter="1"
		data-amt="0.15"
	>
		<circle class="cursor__inner" cx="40" cy="40" r="20"></circle>
	</svg>

	<div class="cursor hold">HOLD</div>
</template>

<script>
export default {
	name: 'CustomCursor'
}
</script>

<style scoped lang="scss">
.cursor {
	position: fixed;
	top: 0;
	left: 0;
	display: block;
	pointer-events: none;
	z-index: 10000;
}

.cursor--1 .cursor__inner {
	// fill: grey;
	fill: none;
	stroke: var(--c-white);
	stroke-width: 1.75px;
	stroke-dasharray: 1.1;
	stroke-dashoffset: 1.1;
	transform: rotate(-90deg);
	transform-origin: center;
	stroke-linecap: round;
	transition: stroke-dashoffset ease 1.6s;
}

.cursor--1 .cursor__inner.process {
	stroke-dashoffset: 0;
}

.cursor--2 .cursor__inner {
	fill: none;
	stroke: white;
	stroke-width: 0.5px;
	// opacity: 0.33;
}

.hold {
	color: white;
	font-family: 'PP Telegraf Bold';
	font-size: 10px;
	line-height: 1;
	opacity: 0 !important;
	margin: 0;
	transition: opacity ease 150ms;

	&.active {
		opacity: 1 !important;
	}
}

.star {
	opacity: 1 !important;
	transition: opacity ease 150ms;

	&.hide {
		opacity: 0 !important;
	}
}
</style>
