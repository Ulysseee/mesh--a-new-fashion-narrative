<template>
	<div class="helper__scroll">
		<p>Scroll to move and tap to discover</p>
	</div>
</template>

<script>
import Experience from '@classes/Experience'

export default {
	name: 'ControlsComponent',

	mounted() {
		this.experience = new Experience()
		this.anims = this.experience.anims

		setInterval(() => {
			if (this.experience.lastScrollTime) {
				const seconds =
					(new Date().getTime() - this.experience.lastScrollTime) /
					1000

				if (this.experience.infoOpen || seconds < 5) {
					this.anims.hideScrollHelper()
				} else {
					this.anims.showScrollHelper()
				}
			}
		}, 500)
	}
}
</script>

<style scoped lang="scss">
.helper__scroll {
	position: absolute;
	left: 50%;
	z-index: 99;
	color: var(--c-white);
	background: rgba(0, 0, 0, 0.3);
	padding: 5px 30px;
	border-radius: 30px;
	text-transform: uppercase;
	transform: translateX(-50%);
	font-family: 'Brilliant Cut Pro';
	animation: MoveUpDown 4s linear infinite;
	pointer-events: none;

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
