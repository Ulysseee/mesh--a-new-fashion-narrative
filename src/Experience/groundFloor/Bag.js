import * as THREE from 'three'
import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Bag extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.bagModel
		this.setCube()
	}

	setCube() {
		this.resource.scene.scale.set(0.8, 0.8, 0.8)
		this.resource.scene.position.set(2, 0, 0)

		this.resource.scene.userData.type = 'cloth1'
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
