import { AmbientLight, AxesHelper } from 'three'
import Experience from '../Experience.js'
export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setEnvironment()
	}

	setEnvironment() {
		const ambientLight = new AmbientLight(0xffffff, 1.3)
		const axesHelper = new AxesHelper(5)
		this.scene.add(axesHelper)

		this.scene.add(this.grid, ambientLight)
	}
}
