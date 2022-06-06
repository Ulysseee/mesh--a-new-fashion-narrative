import Experience from '../Experience.js'
import Sky from '@classes/shared/sky'
import Environment from './Environment.js'
import Grass from './Grass.js'
import Portal from '../shared/Portal.js'
import Butterfly from './Butterfly.js'
import Flower from './Flower.js'
import Particles from './Particles.js'
import WaterClass from './Water.js'
import Cube from './Cube.js'

import Spline from '../shared/Spline.js'
import gsap from 'gsap'
import { Circ } from 'gsap'

import { secondFloorPath } from '../pathes'

export default class SecondFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.raycaster = this.experience.raycaster

		this.timeline = document.querySelector('.header__timeline__2--progress')
		this.dot = document.querySelector('.header__timeline--dot2')
		this.dot.classList.add('fill')

		// this.isInfosActive = false

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.grass = new Grass()
			this.sky = new Sky()
			// this.water = new WaterClass()
			this.butterfly = new Butterfly()
			this.flower = new Flower()
			this.cube = new Cube()

			this.spline = new Spline(secondFloorPath)

			this.portal = new Portal()
			this.portal.mesh.name = 'portal2'
			this.portal.mesh.userData.type = 'portail'

			this.particles = new Particles()
		})
	}

	handleClick() {
		if (this.raycaster.currentIntersect.object.userData.type === 'cloth5') {
			this.experience.selectedItem = true

			this.experience.savedPosition =
				this.camera.instance.position.clone()
			gsap.to(this.camera.instance.position, {
				duration: 2,
				x: this.cube.cube.position.x,
				y: this.cube.cube.position.y,
				z: this.cube.cube.position.z - 1,
				ease: Circ.easeOut
			})

			this.cube.displayInfo('.cloth5')
			this.experience.infoOpen = true
			this.experience.parallax.active = false
		}
	}

	update() {
		if (this.grass) this.grass.update()
		if (this.butterfly) this.butterfly.update()
		if (this.flower) this.flower.update()
		if (this.particles) this.particles.update()
		if (this.water) this.water.update()
		if (this.spline) {
			this.percent = this.spline.curve.getUtoTmapping(
				this.spline.scroll.current
			)

			this.timeline.style.transform = `scaleY(${this.percent})`

			if (!this.experience.selectedItem) {
				this.spline.update()
			}
		}
	}

	destroy() {}
}
