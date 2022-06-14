import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Dress extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.dressModel
		this.setDress()
	}

	setDress() {
		this.resource.scale.set(0.04, 0.04, 0.04)
		this.resource.position.set(6, 5, -4)
		this.resource.userData.type = 'cloth2'
		this.experience.items.push(this.resource)
		this.scene.add(this.resource)
	}
}
