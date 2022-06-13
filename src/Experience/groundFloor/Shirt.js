import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Shirt extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.shirtModel
		this.setCube()
	}

	setCube() {
		this.resource.scene.scale.set(0.03, 0.03, 0.03)
		this.resource.scene.position.set(2, 1.5, 6)
		// this.resource.scene.userData.type = 'cloth1'
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
