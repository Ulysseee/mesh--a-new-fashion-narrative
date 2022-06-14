import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Latex extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.latexModel
		this.setLatex()
	}

	setLatex() {
		this.resource.scale.set(0.04, 0.04, 0.04)
		this.resource.position.set(6, 5, 0)
		this.resource.userData.type = 'cloth2'
		this.experience.items.push(this.resource)
		this.scene.add(this.resource)
	}
}
