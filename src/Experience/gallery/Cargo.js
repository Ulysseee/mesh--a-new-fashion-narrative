import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Cargo extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.cargoModel
		this.debug = this.experience.debug

		this.setCargo()
		if (this.debug) this.setDebug()
	}
	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'jupe',
			expanded: true
		})

		f.addInput(this.resource.scene.position, 'x', {
			min: -30,
			max: 30,
			step: 0.01
		})

		f.addInput(this.resource.scene.position, 'y', {
			min: -30,
			max: 30,
			step: 0.01
		})

		f.addInput(this.resource.scene.position, 'z', {
			min: -30,
			max: 30,
			step: 0.01
		})
	}

	setCargo() {
		this.resource.scene.scale.set(2.2, 2.2, 2.2)
		this.resource.scene.position.set(-3.26, 2.31, 0.65)
		this.resource.scene.rotation.y = 0

		this.resource.scene.userData.name = 'cloth3'
		this.resource.scene.traverse((child) => {
			child.userData.name = 'cloth3'
		})

		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
