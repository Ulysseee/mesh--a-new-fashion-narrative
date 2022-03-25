import { AmbientLight, SpotLight, PointLight, GridHelper } from 'three'
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
		this.scene.add(this.grid)

		const ambientLight = new AmbientLight(0xffffff, 0.6)
		const spotLight = new SpotLight(0xffffff)
		spotLight.position.set(10, 80, 10)

		spotLight.castShadow = true

		spotLight.shadow.mapSize.width = 1024
		spotLight.shadow.mapSize.height = 1024

		spotLight.shadow.camera.near = 500
		spotLight.shadow.camera.far = 4000
		spotLight.shadow.camera.fov = 30

		const pointLight = new PointLight(0xffffff, 0.35)

		pointLight.position.set(0, 10, -35)
		pointLight.castShadow = true

		this.scene.add(pointLight)
		this.scene.add(spotLight)
		this.scene.add(ambientLight)
	}
}
