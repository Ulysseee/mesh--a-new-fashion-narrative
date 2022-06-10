<template>
	<div class="threeScene">
		<canvas ref="container" class="container"></canvas>
	</div>
</template>

<script>
import Experience from '@classes/Experience'
export default {
	name: 'ThreeScene',
	props: {
		msg: String
	},

	mounted() {
		new Experience(this.$refs.container)
	}
}
</script>

<style scoped lang="scss"></style>
