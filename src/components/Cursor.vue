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

	<!-- <span
		class="Label small-caps"
		data-v-31673794=""
		style="
			transform: translate(-50%, -50%) translate(-0.25px, 0px);
			opacity: 0;
			visibility: hidden;
		"
		>Dive in</span
	> -->
	<!--
	<div
		class="CustomCursor z-cursor"
		data-v-31673794=""
		data-v-00b02b7e=""
		style="transform: translate(1351px, 396px); display: none"
	>
		<div class="Cursor" data-v-31673794="">
			<svg
				class="Border"
				fill="none"
				viewBox="0 0 200 200"
				data-v-31673794=""
				style="transform-origin: 50% 0%; transform: scale(0, 0)"
			>
				<circle
					cx="100"
					cy="100"
					r="95.3125"
					stroke="var(--white)"
					stroke-width="9.375"
					data-v-31673794=""
				></circle>
				<circle
					cx="100"
					cy="100"
					r="95.3125"
					stroke="url(#UIBtnCamera-gradient)"
					stroke-width="9.375"
					data-v-31673794=""
				></circle>
				<defs data-v-31673794="">
					<linearGradient
						id="UIBtnCamera-gradient"
						x1="32.62"
						x2="233.51"
						y1="-58.83"
						y2="21.69"
						gradientUnits="userSpaceOnUse"
						data-v-31673794=""
					>
						<stop stop-color="#F5AAE0" data-v-31673794=""></stop>
						<stop
							offset=".48"
							stop-color="#A47CDA"
							stop-opacity=".82"
							data-v-31673794=""
						></stop>
						<stop
							offset="1"
							stop-color="#4D4BD2"
							stop-opacity=".63"
							data-v-31673794=""
						></stop>
					</linearGradient>
				</defs></svg
			><span
				class="Background"
				data-v-31673794=""
				style="transform-origin: 50% 0%; transform: scale(0, 0)"
			></span
			><span
				class="Label small-caps"
				data-v-31673794=""
				style="
					transform: translate(-50%, -50%) translate(-0.25px, 0px);
					opacity: 0;
					visibility: hidden;
				"
				>Dive in</span
			>
		</div>
	</div> -->
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
	fill: #27348b;

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
	stroke: #27348b;
	stroke-width: 1px;
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
