<template>
	<div class="helper__scroll">
		<p ref="helper">Scroll to explore and tap to discover</p>
	</div>
</template>

<script>
import Experience from '@classes/Experience'
import SplitType from 'split-type'

export default {
	name: 'ControlsComponent',

	mounted() {
		new SplitType(this.$refs.helper, {
			types: 'words',
			tagName: 'span'
		})

		this.experience = new Experience()
		this.anims = this.experience.anims
		let seconds
		setInterval(() => {
			if (this.experience.lastScrollTime) {
				seconds =
					(new Date().getTime() - this.experience.lastScrollTime) /
					1000

				if (
					this.experience.infoOpen ||
					seconds < 5 ||
					this.experience.isLoading
				) {
					this.anims.hideScrollHelper()
				} else {
					this.anims.showScrollHelper()
				}
			}
		}, 1000)
	}
}
</script>

<style scoped lang="scss">
.helper__scroll {
	position: absolute;
	left: 50%;
	z-index: 99;
	color: var(--c-white);
	padding: 5px 30px;
	border-radius: 30px;
	text-transform: uppercase;
	transform: translateX(-50%);
	font-family: 'Brilliant Cut Pro';
	animation: MoveUpDown 4s linear infinite;
	pointer-events: none;
	border: 0.5px solid var(--c-white);
	transform-origin: center;

	font-size: 0.75rem;

	p {
		font-size: 10px;
	}
}

@keyframes MoveUpDown {
	0%,
	100% {
		bottom: 20px;
	}
	50% {
		bottom: 30px;
	}
}
</style>
