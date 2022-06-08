<template>
	<div class="header__timeline__wrapper">
		<div class="header__timeline--dot3"></div>
		<div class="header__timeline__2">
			<div class="header__timeline__2--progress"></div>
		</div>
		<div class="header__timeline--dot2"></div>
		<div class="header__timeline__1">
			<div class="header__timeline__1--progress"></div>
		</div>
		<div class="header__timeline--dot1"></div>
	</div>
</template>

<script>
export default {
	name: 'ExperienceTimeline'
}
</script>

<style scoped lang="scss">
.header__timeline__wrapper {
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	height: 42%;
	width: 5px;

	.header__timeline__1,
	.header__timeline__2,
	.header__timeline__3 {
		flex: 1;
		width: 1px;
		background: white;
		position: relative;
		background: rgba(255, 255, 255, 0.4);
	}

	.header__timeline--dot1,
	.header__timeline--dot2,
	.header__timeline--dot3 {
		width: 5px;
		height: 5px;
		border-radius: 50%;

		border: 1px solid #fff;
	}

	.fill {
		background: #fff;
	}

	.header__timeline__1--progress,
	.header__timeline__2--progress,
	.header__timeline__3--progress {
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		height: 100%;
		width: inherit;
		transform: scaleY(0);
		transform-origin: bottom center;
	}
}
</style>
