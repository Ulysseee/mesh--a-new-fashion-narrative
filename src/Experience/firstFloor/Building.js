import Experience from '../Experience'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		// Resource
		this.resource = this.resources.items.firstFloorModel

		this.setModel()
	}

	setModel() {
		this.model = this.resource.scene
		this.model.position.set(0, -6, 50)
		this.model.rotation.y = Math.PI / 2
		this.scene.add(this.model)
	}
}
