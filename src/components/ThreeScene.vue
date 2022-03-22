<template>
	<div class="threeScene">
		<div ref="container" class="container" />
	</div>
</template>

<script>
import MainThreeScene from '../classes/MainThreeScene'
export default {
	name: 'ThreeScene',
	props: {
		msg: String
	},
	mounted() {
		MainThreeScene.init(this.$refs.container)
	}
}
</script>
