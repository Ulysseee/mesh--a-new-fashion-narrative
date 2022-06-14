import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Jacket extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.jacketModel
		this.setCube()
	}

	setCube() {
		this.resource.scene.scale.set(1, 1, 1)
		this.resource.scene.position.set(-16, 0, -9)
		this.resource.scene.userData.type = 'cloth2'
		this.experience.items.push(this.resource.scene)

		this.scene.add(this.resource.scene)
	}

	update() {}
}
