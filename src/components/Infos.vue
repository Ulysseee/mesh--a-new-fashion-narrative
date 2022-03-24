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
import MainThreeScene from '@classes/MainThreeScene'
export default {
	name: 'InfosArea',
	data() {
		console.log(MainThreeScene.isInfosActive)
		return {
			isVisble: MainThreeScene.isInfosActive ? true : false
		}
	},
	methods: {
		handleClick() {
			console.log(this.isVisble)
		}
	}
}
</script>

<style scoped lang="scss">
.hidden {
	display: none;
}
.infos {
	width: 400px;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 2;
	color: white;

	h4 {
		margin: 15px 0;
	}
}
</style>
