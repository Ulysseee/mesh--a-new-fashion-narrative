<template>
	<ThreeScene />
	<Header />
	<LoadingScreen />
	<ControlsComponent />
	<Information @toggle-information="toggleModal" />
	<CustomCursor />
	<ExperienceTimeline />
	<Nft />
</template>

<script>
import gsap from 'gsap'
import ThreeScene from './components/ThreeScene.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import Header from './components/Header.vue'
import ControlsComponent from './components/Controls.vue'
import Information from './components/InformationModal.vue'
import CustomCursor from './components/Cursor.vue'
import ExperienceTimeline from './components/Timeline.vue'
import Nft from './components/Nft.vue'

export default {
	name: 'App',

	components: {
		ThreeScene,
		LoadingScreen,
		Header,
		ControlsComponent,
		Information,
		CustomCursor,
		ExperienceTimeline,
		Nft
	},
	emits: ['toggle-information'],

	data() {
		return {
			isInformationActive: false
		}
	},

	methods: {
		toggleModal() {
			if (!this.isAboutActive) {
				gsap.to('.information', {
					x: 0,
					duration: 0.5,
					ease: 'expo.easeInOut'
				})
			} else {
				gsap.to('.information', {
					x: '100%',
					duration: 0.5,
					ease: 'expo.easeInOut'
				})
			}

			this.isAboutActive = !this.isAboutActive
		}
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
