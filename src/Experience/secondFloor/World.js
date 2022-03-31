// import { Raycaster } from 'three'

import Experience from '../Experience.js'
import Sky from './Sky.js'
import Environment from './Environment.js'
import Mouse from '@utils/Mouse'
import Grass from './Grass.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		// this.raycaster = new Raycaster()
		// this.currentIntersect = null
		// this.isInfosActive = false

		this.mouse = new Mouse()

		// window.addEventListener('mousemove', this.mouse.getMousePos)
		// window.addEventListener('click', () => {
		// 	this.handleClick()
		// })

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.grass = new Grass()
			this.sky = new Sky()
		})
	}

	update() {}

	destroy() {}
}
