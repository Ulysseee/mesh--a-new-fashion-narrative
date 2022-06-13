import Experience from '../Experience.js'
import * as THREE from 'three'
export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.rdcModel
		this.setModel()
	}

	setModel() {
		this.resource.scene.scale.set(2, 2, 2)
		this.resource.scene.position.set(0, 0, 0)

		this.scene.add(this.resource.scene)
	}
}
