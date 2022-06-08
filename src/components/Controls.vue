<template>
	<div class="helper__scroll">
		<p>Scroll to explore</p>
		<div class="helper__scroll__line"></div>
	</div>
</template>

<script>
export default {
	name: 'ControlsComponent'
}
</script>

<style scoped lang="scss">
.helper__scroll {
	position: absolute;
	bottom: 0px;
	left: 50%;
	z-index: 99;
	color: var(--c-white);
	text-transform: uppercase;
	transform: translateX(-50%);
	font-family: 'Brilliant Cut Pro';
	font-size: 0.75rem;

	&__line {
		position: relative;
		display: block;
		margin: auto;
		width: 1px;
		height: 3.5vh;
		background-color: var(--c-white);
		opacity: 1;
	}
}
</style>
