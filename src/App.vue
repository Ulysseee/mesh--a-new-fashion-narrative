<template>
	<ThreeScene />
	<Header />
	<LoadingScreen @toggle-video="toggleVideo" />
	<ControlsComponent />
	<Information @toggle-information="toggleModal" />
	<ExperienceTimeline />
	<NftComponent />
	<Teleporter />
	<CustomCursor />

	<div class="video__container">
		<video id="video">
			<source src="/assets/img/movie.mp4" type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	</div>
</template>

<script>
import gsap, { Power3 } from 'gsap'

import Experience from './Experience/Experience.js'

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
		this.experience = new Experience()
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
		},
		toggleVideo() {
			document.querySelector('#video').play()
			document.getElementById('video').addEventListener(
				'ended',
				() => {
					gsap.timeline()
						.to(document.querySelector('#video'), {
							duration: 1.6,
							opacity: 0,
							ease: Power3.easeIn
						})
						.to('.video__container', {
							css: { display: 'none' }
						})
					this.experience.isLoading = false
				},
				false
			)
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

.video__container {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	left: 0;
	height: 100%;
	display: flex;
}
#video {
	// opacity: 0;
	overflow: hidden;
	object-fit: cover;
	z-index: 99;
	pointer-events: none;
}
</style>
