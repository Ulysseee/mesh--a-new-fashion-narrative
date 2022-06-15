import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Dress extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.dressModel

		if (this.debug) this.setDebug()
		this.setDress()
	}

	setDebug() {
		console.log('tototototo')
		const f = this.debug.gui.addFolder({
			title: 'uhfufuhfuh',
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
		this.resource.position.set(6, 5, -4)
		this.resource.userData.type = 'cloth2'
		this.experience.items.push(this.resource)
		this.scene.add(this.resource)
	}
}
