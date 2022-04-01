import { Raycaster, AxesHelper } from 'three'

import Experience from '../Experience.js'
import Rdc from './Rdc.js'
import Cloth from './Cloth.js'
import Spline from './Spline.js'
import Environment from './Environment.js'
import Mouse from '@utils/Mouse'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		this.raycaster = new Raycaster()
		this.currentIntersect = null
		this.isInfosActive = false

		this.mouse = new Mouse()

		const axesHelper = new AxesHelper(5)
		this.scene.add(axesHelper)

		window.addEventListener('mousemove', this.mouse.getMousePos)
		window.addEventListener('click', () => {
			this.handleClick()
		})

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline()
			this.rdc = new Rdc()
			this.environment = new Environment()
			this.cloth = new Cloth()
		})
	}

	// setSounds() {
	// 	this.sounds = new Sounds({
	// 		debug: this.debugFolder,
	// 		time: this.time
	// 	})
	// }

	// setReveal() {
	// 	// Progress
	// 	this.resources.on('progress', (_progress) => {
	// 		// Update area
	// 	})
	// }

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersect = this.raycaster.intersectObjects(this.experience.items)

		if (intersect.length > 0) {
			document.querySelector('html, body').style.cursor = 'pointer'

			this.currentIntersect = intersect[0]
		} else {
			document.querySelector('html, body').style.cursor = 'default'
			this.currentIntersect = null
		}

		if (this.spline) this.spline.update()
	}

	destroy() {}
}
