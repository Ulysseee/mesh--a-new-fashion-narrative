<template>
	<ThreeScene />
	<Header />
	<LoadingScreen />
	<ControlsComponent />
	<Information @toggle-information="toggleModal" />
	<ExperienceTimeline />
	<NftComponent />
	<Teleporter />
	<CustomCursor />

	<!-- <div class="video__container">
		<video id="video" autoplay="autoplay">
			<source src="/assets/img/movie.mp4" type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	</div> -->
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
import NftComponent from './components/Nft.vue'
import Teleporter from './components/Teleporter.vue'

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
		NftComponent,
		Teleporter
	},
	emits: ['toggle-information'],

	data() {
		return {
			isInformationActive: false
		}
	},

	mounted() {
		// document.querySelector('#video').play()
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
#video {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	left: 0;
	height: 100%;
	overflow: hidden;
	z-index: 200000;
}
body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
</style>
