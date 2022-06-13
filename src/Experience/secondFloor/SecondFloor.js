import Experience from '../Experience.js'
import Sky from '@classes/shared/sky'
import Environment from './Environment.js'
import Grass from './Grass.js'
import Portal from '../shared/Portal.js'
import Butterfly from './Butterfly.js'
import Particles from './Particles.js'
import WaterClass from './Water.js'
import Cube from './Cube.js'

import Spline from '../shared/Spline.js'
import { secondFloorPath } from '../pathes'

import gsap, { Circ } from 'gsap'

export default class SecondFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.raycaster = this.experience.raycaster

		// this.isInfosActive = false

		this.scene.fog = null

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline(secondFloorPath)

			this.environment = new Environment()
			this.grass = new Grass()
			this.sky = new Sky()
			this.water = new WaterClass()
			// this.butterfly = new Butterfly()
			this.cube = new Cube()

			this.portal = new Portal()
			this.portal.mesh.name = 'portal2'
			this.portal.mesh.userData.type = 'portail'
			this.portal.mesh.position.set(0, 5, 14)
			this.portal.mesh.rotation.set(0, 0, 0)

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
		if (this.portal) this.portal.update()

		if (this.spline) {
			this.percent = this.spline.curve.getUtoTmapping(
				this.spline.scroll.current
			)

			if (!this.experience.selectedItem && !this.experience.isLoading) {
				this.spline.update()
			}
		}

		// for (const point of this.points) {
		// 	const screenPosition = point.position.clone()
		// 	screenPosition.project(camera)

		// 	const translateX = screenPosition.x * sizes.width * 0.5
		// 	const translateY = -screenPosition.y * sizes.height * 0.5
		// 	point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
		// }

		if (this.butterfly) this.butterfly.update()
		if (this.particles) this.particles.update()
		if (this.water) this.water.update()
		if (this.grass) this.grass.update()
	}

	destroy() {}
}
