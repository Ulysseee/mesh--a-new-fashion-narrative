import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Dress extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.dress = this.experience.resources.items.dress

		this.setBonce()
	}

	setBonce() {
		this.scene.add(this.dress.scene)
	}
}
