import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Shoes extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.shoesModel
		this.setCube()
	}

	setCube() {
		this.resource.scene.scale.set(0.1, 0.1, 0.1)
		this.resource.scene.position.set(2, 2, -4)
		// this.resource.scene.userData.type = 'cloth1'
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
