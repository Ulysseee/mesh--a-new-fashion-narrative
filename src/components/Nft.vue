<template>
	<div class="nft">
		<div class="point point-0">
			<a
				href="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86611962038610490963641179866893364690666313135465894002853423414214574211073"
				target="_blank"
				class="label"
			>
				<img class="fit-picture" src="/assets/img/qr_1.png" />
			</a>
			<div class="text">GET NFT</div>
		</div>

		<div class="point point-1">
			<a
				href="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86611962038610490963641179866893364690666313135465894002853423413115062583297"
				target="_blank"
				class="label"
			>
				<img class="fit-picture" src="/assets/img/qr_2.png" />
			</a>
			<div class="text">GET NFT</div>
		</div>

		<div class="point point-2">
			<a
				href="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/86611962038610490963641179866893364690666313135465894002853423412015550955521"
				target="_blank"
				class="label"
			>
				<img class="fit-picture" src="/assets/img/qr_3.png" />
			</a>
			<div class="text">GET NFT</div>
		</div>
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
		display: block;
		top: -35px;
		left: -35px;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background: #fff;
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
