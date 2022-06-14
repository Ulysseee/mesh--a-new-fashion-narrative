import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Sweat extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.sweatModel
		this.setSweat()
	}

	setSweat() {
		this.resource.scene.scale.set(2.25, 2.25, 2.25)
		this.resource.scene.position.set(-17, 2.5, 10.5)

		this.resource.scene.userData.name = 'cloth2'
		this.resource.scene.userData.type = '2_1'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth2'
			child.userData.type = '2_1'
		})

		this.resource.scene.rotation.y = Math.PI / 2
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
