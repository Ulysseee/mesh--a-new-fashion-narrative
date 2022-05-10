import Experience from '../Experience.js'
import Sky from '@classes/shared/sky'
import Environment from './Environment.js'
import Grass from './Grass.js'
import Portal from '../shared/Portal.js'
import Butterfly from './Butterfly.js'
import Flower from './Flower.js'
import Particles from './Particles.js'
import WaterClass from './Water.js'
import Spline from '../shared/Spline.js'
export default class SecondFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		// this.isInfosActive = false

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.grass = new Grass()
			this.sky = new Sky()
			// this.water = new WaterClass()
			this.butterfly = new Butterfly()
			// this.flower = new Flower()

			this.spline = new Spline()

			this.portal = new Portal()
			this.portal.mesh.name = 'portal3'

			this.particles = new Particles()
		})

		window.addEventListener('click', () => {
			this.handleClick()
		})
	}

	handleClick() {
		if (
			this.experience.raycaster.currentIntersect &&
			this.experience.raycaster.currentIntersect.object.name ===
				'portal' &&
			this.experience.raycaster.onPortal === true
		) {
			console.log('nft')
		}
	}

	update() {
		if (this.grass) this.grass.update()
		if (this.butterfly) this.butterfly.update()
		if (this.flower) this.flower.update()
		if (this.particles) this.particles.update()
		if (this.water) this.water.update()
		if (this.spline) this.spline.update()
	}

	destroy() {}
}
