import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Kimono extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.kimonoModel

		if (this.debug) this.setDebug()

		this.setKimono()
	}

	setDebug() {
		console.log('tototototo')
		const f = this.debug.gui.addFolder({
			title: 'kimo',
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

	setKimono() {
		this.resource.scale.set(0.04, 0.04, 0.04)
		this.resource.position.set(10, 5, -7)
		this.resource.userData.type = 'cloth2'
		this.experience.items.push(this.resource)
		this.scene.add(this.resource)
	}
}
