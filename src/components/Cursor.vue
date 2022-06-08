<template>
	<svg
		class="cursor cursor--1"
		width="12"
		height="12"
		viewBox="0 0 12 12"
		data-scale-enter="12"
		data-opacity-enter="1"
	>
		<circle
			class="cursor__inner"
			pathLength="1"
			cx="6"
			cy="6"
			r="3"
		></circle>
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
	fill: white;

	stroke: var(--c-white);
	stroke-width: 0.3px;
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
	stroke-width: 1px;
	opacity: 0.33;
}

.hold {
	color: white;
	font-family: 'PP Telegraf Bold';
	font-size: 10px;
	line-height: 1;
	opacity: 0 !important;
	margin: 0;

	&.active {
		opacity: 1 !important;
	}
}
</style>
