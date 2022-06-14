import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Jupe extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.jupeModel
		this.debug = this.experience.debug

		this.setJupe()
	}

	setJupe() {
		this.resource.scene.scale.set(2.2, 2.2, 2.2)
		this.resource.scene.position.set(0.65, 2.2, -1.3)
		this.resource.scene.rotation.y = 1

		this.resource.scene.userData.name = 'cloth1'
		this.resource.scene.userData.type = '1_2'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth1'
			child.userData.type = '1_2'
		})

		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
