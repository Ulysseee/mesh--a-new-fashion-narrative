import { AmbientLight, PointLight } from 'three'
import Experience from '../Experience.js'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setEnvironment()
	}

	setEnvironment() {
		const ambientLight = new AmbientLight(0xffffff, 1.1)
		const pointLight = new PointLight(0xffffff, 0.35)

		pointLight.position.set(0, 10, -35)
		pointLight.castShadow = true

		this.scene.add(pointLight)
		this.scene.add(ambientLight)
	}
}
