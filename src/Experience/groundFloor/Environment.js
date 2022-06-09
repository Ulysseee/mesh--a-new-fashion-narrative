import { AmbientLight, PointLight, AxesHelper } from 'three'
import Experience from '../Experience.js'
export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setEnvironment()
	}

	setEnvironment() {
		const ambientLight = new AmbientLight(0xffffff, 2)

		this.scene.add(ambientLight)
	}
}
