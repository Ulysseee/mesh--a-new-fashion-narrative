import * as THREE from 'three'
import Experience from '../Experience.js'
import Clothes from '../shared/Clothes.js'

export default class Shoes extends Clothes {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.marronModel
		this.setBag()
	}

	setBag() {
		this.resource.scene.scale.set(2, 2, 2)
		this.resource.scene.position.set(2, 4, 2)
		this.experience.items.push(this.resource.scene)
		this.scene.add(this.resource.scene)
	}

	update() {}
}
