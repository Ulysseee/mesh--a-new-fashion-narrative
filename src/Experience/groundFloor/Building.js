import Experience from '../Experience.js'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		// Resource
		this.resource = this.resources.items.rdcModel

		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.position.set(0, 0, -32)
		this.scene.add(this.model)
	}
}