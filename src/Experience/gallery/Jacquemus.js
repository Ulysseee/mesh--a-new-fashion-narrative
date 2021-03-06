import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Jacquemus extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.jacquemus

		this.setJacquemus()
	}

	setJacquemus() {
		this.resource.scene.scale.set(2.75, 2.75, 2.75)
		this.resource.scene.position.set(-17, 2.5, -8)

		this.resource.scene.userData.type = 'cloth4'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth4'
		})

		this.resource.scene.rotation.y = Math.PI / 2
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
