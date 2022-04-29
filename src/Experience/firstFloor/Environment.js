import {
	DirectionalLight,
	DirectionalLightHelper,
	AmbientLight,
	GridHelper
} from 'three'
import Experience from '../Experience'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setEnvironment()
	}

	setEnvironment() {
		const grid = new GridHelper(188, 18)
		grid.position.set(0, 0, 0)

		const ambientLight = new AmbientLight(0xffffff, 2.9)
		const directionalLight = new DirectionalLight(0xffffff, 0.35)
		const directionalLightHelper = new DirectionalLightHelper(
			directionalLight,
			1
		)

		directionalLight.position.set(0, 24, 0)
		directionalLight.castShadow = true

		this.scene.add(
			grid,
			ambientLight,
			directionalLight,
			directionalLightHelper
		)
	}
}
