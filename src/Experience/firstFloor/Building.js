import Experience from '../Experience'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		// Resource
		console.log(this.resources)
		this.resource = this.resources.items.firstFloorModel

		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.position.set(0, -6, 0)
		this.scene.add(this.model)
	}
}
