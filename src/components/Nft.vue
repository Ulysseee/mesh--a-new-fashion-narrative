<template>
	<div class="nft">
		<div class="point point-0">
			<div class="label">
				<!-- <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#FFFFFF"
						d="M67.5,-41.6C78.5,-20,72.1,9,58,29.8C43.8,50.6,21.9,63.3,0,63.4C-21.9,63.4,-43.8,50.7,-56.5,30.7C-69.2,10.6,-72.7,-16.7,-61.8,-38.3C-50.8,-59.9,-25.4,-75.7,1.4,-76.6C28.3,-77.4,56.6,-63.2,67.5,-41.6Z"
						transform="translate(100 100)"
					/>
				</svg> -->

				<img class="fit-picture" src="/assets/img/qr_code.png" />
			</div>
			<div class="text">NFT available for sale</div>
		</div>
		<!-- <div class="point point-1">
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
		</div> -->
	</div>
</template>

<script>
export default {
	name: 'NftComponent',
	mounted() {}
}
</script>

<style scoped lang="scss">
.point {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 1000;
	opacity: 0;
	/* pointer-events: none; */

	.label {
		position: relative;
		top: -35px;
		left: -35px;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background: #fff;
		// cursor: help;
		transform: scale(0, 0);
		transition: transform 0.3s;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: inherit;
			height: inherit;
			position: absolute;
		}

		img {
			width: 50%;
			height: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.text {
		position: absolute;
		top: 30px;
		left: -90px;
		width: 180px;
		color: #fff;
		padding: 1rem 0;
		font-family: 'Brilliant Cut Pro';
		text-transform: uppercase;
		text-align: center;
		font-size: 0.625rem;
		opacity: 0;
		pointer-events: none;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	}
}

.point.visible .label {
	transform: scale(1, 1);
}
.point.visible .text {
	opacity: 1;
}
</style>
