import { MeshStandardMaterial } from 'three'
import Experience from '../Experience.js'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.rdcModel
		this.envMap = this.resources.items.envMap

		console.log(this.envMap)

		this.setModel()
	}

	setModel() {
		// this.resource.scale.set(0.00001, 0.0001, 0.0001)
		// this.resource.position.set(0, 0, -32)
		// this.scene.add(this.resource)
		// this.experience.items.push(this.resource)

		// this.resource.scene.scale.set(0.5, 0.5, 0.5)
		this.resource.scene.position.set(30, -8, 0)

		// this.resource.scene.traverse((child) => {
		// 	if (child.material) {
		// 		child.material = new MeshStandardMaterial({
		// 			metalness: 0,
		// 			roughness: 0.3,
		// 			// envMapIntensity: 1.0,
		// 			envMap: this.envMap
		// 		})
		// 		child.material.needsUpdate = true
		// 	}
		// })
		this.scene.add(this.resource.scene)
	}
}
