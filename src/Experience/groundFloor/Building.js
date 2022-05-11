import Experience from '../Experience.js'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		// Resource
		this.resource = this.resources.items.rdcModel

		this.setModel()
	}

	setModel() {
		this.resource.scale.set(0.05, 0.05, 0.05)
		this.resource.position.set(0, 0, -32)
		this.scene.add(this.resource)
	}
}
