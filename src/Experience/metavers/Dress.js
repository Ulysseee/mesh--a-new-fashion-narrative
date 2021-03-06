import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Dress extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.debug = this.experience.debug
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.dressModel

		if (this.debug) this.setDebug()
		this.setDress()
	}

	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'dress',
			expanded: true
		})

		f.addInput(this.resource.position, 'x', {
			min: -30,
			max: 30,
			step: 0.01
		})

		f.addInput(this.resource.position, 'y', {
			min: -30,
			max: 30,
			step: 0.01
		})

		f.addInput(this.resource.position, 'z', {
			min: -30,
			max: 30,
			step: 0.01
		})
	}

	setDress() {
		this.resource.scale.set(0.04, 0.04, 0.04)
		this.resource.position.set(3.3, 5.2, 1)
		this.resource.rotation.y = -Math.PI / 2

		this.resource.userData.type = 'cloth2'
		this.experience.items.push(this.resource)
		this.scene.add(this.resource)
	}
}
