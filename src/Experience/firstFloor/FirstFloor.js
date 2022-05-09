import Experience from '../Experience'
import Sky from '@classes/shared/sky'
import Environment from './Environment'
import Building from '../firstFloor/Building'
import Portal from '../shared/Portal'
import Mouse from '@utils/Mouse'
import { Raycaster } from 'three'

export default class FirstFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.mouse = new Mouse()
		this.onPortal = null
		this.currentIntersect = null
		this.raycaster = new Raycaster()

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.sky = new Sky()
			this.firstFloor = new Building()
			this.portal = new Portal()
		})
	}

	handleClick() {
		if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal' &&
			this.onPortal === true
		) {
			this.experience.switch('secondFloor')
			this.experience.cursor.leave()
			this.currentIntersect = null
		}
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersect = this.raycaster.intersectObjects(this.experience.items)

		if (intersect.length > 0) {
			this.currentIntersect = intersect[0]

			if (this.currentIntersect.object.name === 'portal') {
				this.onPortal = true
				this.experience.cursor.enter()
			}
		} else {
			this.experience.cursor.leave()
			this.currentIntersect = null
			this.onPortal = null
		}

		if (this.spline) this.spline.update()
	}
}
