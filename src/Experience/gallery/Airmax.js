import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Airmax extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.airmaxModel
		this.debug = this.experience.debug

		this.setAirmax()
	}

	setAirmax() {
		this.resource.scene.scale.set(0.8, 0.8, 0.8)
		this.resource.scene.position.set(-3.26, 1.8, 4.0)
		this.resource.scene.rotation.y = 3

		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
