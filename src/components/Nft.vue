<template>
	<div>
		<div class="point point-0">
			<div class="label">1</div>
			<div class="text">
				Front and top screen with HUD aggregating terrain and battle
				informations.
			</div>
		</div>
		<div class="point point-1">
			<div class="label">2</div>
			<div class="text">
				Ventilation with air purifier and detection of environment
				toxicity.
			</div>
		</div>
		<div class="point point-2">
			<div class="label">3</div>
			<div class="text">
				Cameras supporting night vision and heat vision with automatic
				adjustment.
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {}
}
</script>

<style scoped lang="scss">
.point {
	position: absolute;
	top: 50%;
	left: 50%;
	/* pointer-events: none; */
}

.point .label {
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
	cursor: help;
	transform: scale(0, 0);
	transition: transform 0.3s;
}

.point .text {
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
	opacity: 0;
	transition: opacity 0.3s;
	pointer-events: none;
}

.point:hover .text {
	opacity: 1;
}

.point.visible .label {
	transform: scale(1, 1);
}
</style>
