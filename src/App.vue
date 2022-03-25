<template>
	<ThreeScene />
	<InfosArea />
	<LoadingScreen />
</template>

<script>
import ThreeScene from './components/ThreeScene.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import InfosArea from './components/Infos.vue'

export default {
	name: 'App',
	components: {
		ThreeScene,
		LoadingScreen,
		InfosArea
	}
}
</script>

<style lang="scss">
body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
</style>
