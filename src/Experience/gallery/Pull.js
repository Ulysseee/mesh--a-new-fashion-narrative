import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Jupe extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.pullModel
		this.debug = this.experience.debug

		this.setPull()
	}

	setPull() {
		this.resource.scene.scale.set(2.2, 2.2, 2.2)
		this.resource.scene.position.set(1.3, 1.96, 2.61)
		this.resource.scene.rotation.y = 0

		this.resource.scene.userData.name = 'cloth1'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth1'
		})

		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
