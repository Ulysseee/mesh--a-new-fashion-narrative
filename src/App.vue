<template>
	<ThreeScene />
	<LoadingScreen />
</template>

<script>
import ThreeScene from './components/ThreeScene.vue'
import LoadingScreen from './components/LoadingScreen.vue'

export default {
	name: 'App',
	components: {
		ThreeScene,
		LoadingScreen
	}
}
</script>

<style lang="scss">
body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
</style>
