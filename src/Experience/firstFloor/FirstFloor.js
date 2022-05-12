import Experience from '../Experience.js'
import Sky from '@classes/shared/sky.js'
import Environment from './Environment.js'
import Building from '../firstFloor/Building.js'
import Portal from '../shared/Portal.js'
import Spline from '../shared/Spline.js'

import { firstFloorPath } from '../pathes'

export default class FirstFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.timeline = document.querySelector('.header__timeline__2--progress')

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline(firstFloorPath)
			this.environment = new Environment()
			this.sky = new Sky()
			this.firstFloor = new Building()

			this.portal = new Portal()
			this.portal.mesh.name = 'portal2'
			this.portal.mesh.userData.type = 'portail'
		})
	}

	update() {
		if (this.spline) {
			this.percent = this.spline.curve.getUtoTmapping(
				this.spline.scroll.current
			)

			this.timeline.style.transform = `scaleX(${this.percent})`
			this.spline.update()
		}
	}
}
