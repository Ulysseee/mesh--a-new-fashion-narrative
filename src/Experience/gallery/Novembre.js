import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Novembre extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.novembreModel
		this.debug = this.experience.debug

		this.setNovembre()
	}

	setNovembre() {
		this.resource.scene.scale.set(2.2, 2.2, 2.2)
		this.resource.scene.position.set(-3.26, 2.61, -3.26)
		this.resource.scene.rotation.y = 0

		this.resource.scene.userData.name = 'cloth3'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth3'
		})

		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
