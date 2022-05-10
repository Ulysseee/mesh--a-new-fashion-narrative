<template>
	<div class="helper__scroll">
		<p>Scroll to explore</p>
		<div class="helper__scroll__line"></div>
	</div>
</template>

<script></script>

<style scoped lang="scss">
.CustomCursor {
	z-index: 10;
	position: fixed;
	top: 50%;
	left: 50%;
	width: 0;
	height: 0;
	pointer-events: none;
	visibility: hidden;

	.Cursor {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 9.875rem;
		height: 9.875rem;
		margin-top: -4.9375rem;
		margin-left: -4.9375rem;
		border-radius: 50%;
	}

	.Border {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		border-radius: inherit;
	}

	.Background {
		position: absolute;
		top: 4px;
		right: 4px;
		bottom: 4px;
		left: 4px;
		border-radius: inherit;
		background-color: #fff;
		background-clip: padding-box;
	}

	.Label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #000;
		font-size: 1rem;
		font-weight: 500;
		text-transform: uppercase;
		font-family: 'Brilliant Cut Pro';
	}
}
</style>
