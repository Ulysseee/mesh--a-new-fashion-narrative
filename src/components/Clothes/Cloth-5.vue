<template>
	<div data-cloth="5" class="cloth cloth5">vêtement du deuxième niveau</div>

	<!-- <div class="point point-0">
		<div class="label">1</div>
		<div class="text">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit
		</div>
	</div> -->
</template>

<script></script>

<style scoped lang="scss">
.cloth5 {
	display: none;

	&.active {
		display: block;
	}
}

.point {
	position: absolute;
	top: 50%;
	left: 50%;

	.label {
		position: absolute;
		top: -20px;
		left: -20px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #00000077;
		border: 1px solid #ffffff77;
		color: #ffffff;
		font-family: Helvetica, Arial, sans-serif;
		text-align: center;
		line-height: 40px;
		font-weight: 100;
		font-size: 14px;
	}

	.text {
		position: absolute;
		top: 30px;
		left: -120px;
		width: 200px;
		padding: 20px;
		border-radius: 4px;
		background: #00000077;
		border: 1px solid #ffffff77;
		color: #ffffff;
		line-height: 1.3em;
		font-family: Helvetica, Arial, sans-serif;
		font-weight: 100;
		font-size: 14px;
	}
}
</style>
