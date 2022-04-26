import Experience from '../Experience'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		// Resource
		console.log(this.resources)
		this.resource = this.resources.items.firstFloorModel

		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.position.set(0, -3, 0)
		this.scene.add(this.model)
	}
}
