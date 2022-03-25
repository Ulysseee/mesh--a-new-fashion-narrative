import { Mesh } from 'three'
import Experience from '../Experience.js'

export default class Cloth {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		// Resource
		this.resource = this.resources.items.clothModel

		this.setModel()
	}

	setModel() {
		this.resource.position.set(0, 0, -32)
		this.scene.add(this.resource)

		this.resource.traverse((child) => {
			if (child instanceof Mesh) {
				child.scale.set(0.0225, 0.0225, 0.0225)
			}
		})
	}
}
