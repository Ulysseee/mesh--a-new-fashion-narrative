import {
	AmbientLight,
	DirectionalLight,
	DirectionalLightHelper,
	AxesHelper
} from 'three'
import Experience from '../Experience.js'
export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.debug = this.experience.debug
		this.scene = this.experience.scene

		this.setDebug()
		this.setEnvironment()
	}

	setDebug() {
		if (this.debug) {
			const axesHelper = new AxesHelper(5)
			this.scene.add(axesHelper)
		}
	}

	setEnvironment() {
		const ambientLight = new AmbientLight(0xffffff, 0.6)

		const directionalLight = new DirectionalLight(0xffffff, 1)
		directionalLight.position.set(0, 40, 0.866)
		const directionalLightHelper = new DirectionalLightHelper(
			directionalLight,
			0.8 * Math.PI
		)

		this.scene.add(ambientLight, directionalLight, directionalLightHelper)
		// this.scene.add(ambientLight)
	}
}
