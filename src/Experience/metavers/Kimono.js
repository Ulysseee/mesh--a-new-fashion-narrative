import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Kimono extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.kimonoModel
		this.setKimono()
	}

	setKimono() {
		console.log(this.resource)
		this.resource.scale.set(0.04, 0.04, 0.04)
		this.resource.position.set(10, 5, -7)
		this.resource.userData.type = 'cloth2'
		this.experience.items.push(this.resource)
		this.scene.add(this.resource)
	}
}
