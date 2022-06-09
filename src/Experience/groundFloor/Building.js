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
		console.log(this.resource)
		this.resource.scale.set(0.00001, 0.0001, 0.0001)
		this.resource.position.set(0, 0, -32)
		this.scene.add(this.resource)
		this.experience.items.push(this.resource)
	}
}
