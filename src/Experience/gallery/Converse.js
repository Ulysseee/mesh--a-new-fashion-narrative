import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Converse extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.converseModel
		this.debug = this.experience.debug

		this.setConverse()
	}

	setConverse() {
		this.resource.scene.scale.set(0.8, 0.8, 0.8)
		this.resource.scene.position.set(1.25, 1.8, -3.95)

		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
