<template>
	<aside class="teleporter">
		<div class="groundFloor">
			<p ref="groundFloor" class="groundFloor__intro">
				GROUND FLOOR Lorem ipsum dolor sit amet, consectetur adipiscing
				elit. Fusce in nibh sed ante mollis scelerisque. Integer
				imperdiet scelerisque elit, a feugiat risus eleifend ac. Duis
				urna velit, condimentum nec dignissim id, pretium vel elit.
				Etiam gravida justo euismod ipsum condimentum, id finibus felis
				tempor. In ac nisl erat.
			</p>
		</div>
		<div class="secondFloor">
			<p ref="secondFloor" class="secondFloor__intro">
				FIRST FLOOR Lorem ipsum dolor sit amet, consectetur adipiscing
				elit. Fusce in nibh sed ante mollis scelerisque. Integer
				imperdiet scelerisque elit, a feugiat risus eleifend ac. Duis
				urna velit, condimentum nec dignissim id, pretium vel elit.
				Etiam gravida justo euismod ipsum condimentum, id finibus felis
				tempor. In ac nisl erat.
			</p>
		</div>
	</aside>
</template>

<script>
// import Experience from '@classes/Experience'
import SplitType from 'split-type'
import gsap from 'gsap'

export default {
	name: 'TeleporterComponent',

	mounted() {
		const groundFloorIntro = new SplitType(this.$refs.groundFloor, {
			types: 'words',
			tagName: 'span'
		})
		gsap.set(groundFloorIntro.words, {
			opacity: 0
		})
		const secondFloorIntro = new SplitType(this.$refs.secondFloor, {
			types: 'words',
			tagName: 'span'
		})
		gsap.set(secondFloorIntro.words, {
			opacity: 0
		})
	}
}
</script>

<style scoped lang="scss">
.teleporter {
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;

	.groundFloor,
	.secondFloor {
		position: absolute;
		width: 50%;
		font-family: 'PP Telegraf';
		text-align: center;
		color: black;
	}

	.groundFloor {
		// display: none;
		opacity: 0;

		&__intro {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
		&.visible {
			display: block;
		}
	}

	.secondFloor {
		opacity: 0;

		&__intro {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}

		&.visible {
			display: block;
		}
	}
}
</style>
