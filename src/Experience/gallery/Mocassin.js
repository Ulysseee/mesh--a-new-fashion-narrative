import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Mocassin extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.mocassin

		this.setMocassin()
	}

	setMocassin() {
		this.resource.scene.scale.set(1, 1, 1)
		this.resource.scene.position.set(-18, 1.725, 4.35)

		this.resource.scene.userData.type = 'cloth2'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth2'
		})

		this.resource.scene.rotation.y = Math.PI / 2
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
