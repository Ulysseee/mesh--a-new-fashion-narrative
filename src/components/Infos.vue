<template>
	<div ref="infos" class="infos" :class="{ hidden: !isVisble }">
		<h4>Lorem Ipsum</h4>
		<p>
			Lorem ipsum dolor sit amet. Ut harum repudiandae At cumque aliquam
			quo deleniti expedita qui expedita laboriosam et impedit possimus?
			Sit veritatis molestiae eum voluptatem
		</p>
	</div>
</template>

<script>
import Experience from '@classes/Experience'
export default {
	name: 'InfosArea',
	data() {
		return {
			isVisble: false
		}
	},

	mounted() {
		this.experience = new Experience()

		if (this.experience.world)
			this.experience.world.handleClick = this.handleClick
	},
	methods: {
		handleClick() {
			this.experience.world.currentIntersect
				? (this.isVisble = true)
				: (this.isVisble = false)
		}
	}
}
</script>

<style scoped lang="scss">
.hidden {
	opacity: 0;
	pointer-events: none;
}
.infos {
	width: 400px;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 2;
	color: white;
	margin: 15px;
	transition: opacity 0.4s ease-in-out;

	h4 {
		margin: 15px 0;
		font-family: 'Desolator Bold';
		text-transform: uppercase;
	}

	p {
		font-family: 'MonumentExtended Light';
		font-size: 0.725rem;
		line-height: 1.5;
	}
}
</style>
