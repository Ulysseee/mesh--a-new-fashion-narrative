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
		this.resource.scene.scale.set(5, 5, 5)
		this.resource.scene.position.set(6, 5, 0)
		this.resource.scene.userData.type = 'cloth2'
		this.resource.scene.traverse((child) => {
			child.frustumCulled = false
		})
		console.log(this.resource.scene)
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}
}
