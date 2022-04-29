<template>
	<div class="helper__scroll">
		<p>Scroll to explore</p>
		<div class="helper__scroll__line"></div>
	</div>
	<!--
	<div class="CustomCursor z-cursor">
		<div class="Cursor">
			<svg class="Border" fill="none" viewBox="0 0 200 200">
				<circle
					cx="100"
					cy="100"
					r="95.3125"
					stroke="var(--white)"
					stroke-width="9.375"
				></circle>
				<circle
					cx="100"
					cy="100"
					r="95.3125"
					stroke="url(#UIBtnCamera-gradient)"
					stroke-width="9.375"
				></circle>
				<defs>
					<linearGradient
						id="UIBtnCamera-gradient"
						x1="32.62"
						x2="233.51"
						y1="-58.83"
						y2="21.69"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#F5AAE0"></stop>
						<stop
							offset=".48"
							stop-color="#A47CDA"
							stop-opacity=".82"
						></stop>
						<stop
							offset="1"
							stop-color="#4D4BD2"
							stop-opacity=".63"
						></stop>
					</linearGradient>
				</defs></svg
			><span class="Background"></span
			><span class="Label small-caps">Hold</span>
		</div>
	</div> -->
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
