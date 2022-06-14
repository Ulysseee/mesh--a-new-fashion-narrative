import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Shoes extends Clothes {
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
		this.resource.scene.scale.set(0.06, 0.06, 0.06)
		this.resource.scene.position.set(-15, 3, -7)
		// this.resource.scene.userData.type = 'cloth1'
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
