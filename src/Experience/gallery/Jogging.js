import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Jogging extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.joggingModel
		this.setJogging()
	}

	setJogging() {
		this.resource.scene.scale.set(1, 1, 1)
		this.resource.scene.position.set(2, 0, 8)
		// this.resource.scene.userData.type = 'cloth1'
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
