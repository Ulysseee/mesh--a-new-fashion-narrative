import { MeshStandardMaterial } from 'three'
import Experience from '../Experience.js'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.rdcModel
		this.setModel()
	}

	setModel() {
		console.log(this.resource)
		this.resource.scene.scale.set(2, 2, 2)
		this.resource.scene.position.set(0, 0, 0)

		// this.resource.scene.traverse((child) => {
		// 	if (child.material) {
		// 		// child.material = new THREE.MeshPhongMaterial()
		// 	}
		// })
		this.scene.add(this.resource.scene)
	}
}
