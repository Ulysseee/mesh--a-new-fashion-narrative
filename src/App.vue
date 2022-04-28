<template>
	<ThreeScene />
	<MainMenu />
	<InfosArea />
	<LoadingScreen />
	<Controls />
</template>

<script>
import ThreeScene from './components/ThreeScene.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import InfosArea from './components/Infos.vue'
import MainMenu from './components/MainMenu.vue'
import Controls from './components/Controls.vue'

export default {
	name: 'App',
	components: {
		ThreeScene,
		LoadingScreen,
		InfosArea,
		MainMenu,
		Controls
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
