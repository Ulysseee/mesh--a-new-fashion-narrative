import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Shirt extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.shirtModel
		this.setShirt()
	}

	setShirt() {
		this.resource.scene.scale.set(0.03, 0.03, 0.03)
		this.resource.scene.position.set(2, 1.5, 6)
		// this.resource.scene.userData.type = 'cloth1'
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
