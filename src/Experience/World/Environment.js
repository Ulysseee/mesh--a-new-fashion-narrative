import {
	DirectionalLight,
	DirectionalLightHelper,
	AmbientLight,
	GridHelper
} from 'three'
import Experience from '../Experience.js'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setEnvironment()
	}

	setEnvironment() {
		this.grid = new GridHelper(48, 18)
		this.grid.position.set(0, 0, -30)

		const ambientLight = new AmbientLight(0xffffff, 0.6)
		const directionalLight = new DirectionalLight(0xffffff, 0.35)
		const directionalLightHelper = new DirectionalLightHelper(
			directionalLight,
			1
		)

		directionalLight.position.set(0, 14, -35)
		directionalLight.castShadow = true

		this.scene.add(
			this.grid,
			ambientLight,
			directionalLight,
			directionalLightHelper
		)
	}
}
