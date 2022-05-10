import Experience from '../Experience'
import Sky from '@classes/shared/sky'
import Environment from './Environment'
import Building from '../firstFloor/Building'
import Portal from '../shared/Portal'

export default class FirstFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.sky = new Sky()
			this.firstFloor = new Building()
			this.portal = new Portal()
			this.portal.mesh.name = 'portal2'
		})
	}

	update() {
		if (this.spline) this.spline.update()
	}
}
