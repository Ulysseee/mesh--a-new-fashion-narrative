import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene

		this.resources = this.experience.resources
		this.matcap = this.resources.items.floorMatcap
		this.floorNormals = this.resources.items.floorNormals

		this.concreteNor = this.resources.items.concreteNor
		this.concreteDiff = this.resources.items.concreteDiff
		this.concreteRough = this.resources.items.concreteRough

		this.setFloor()
	}

	setFloor() {
		const geometry = new THREE.PlaneGeometry(256, 256, 64, 64)

		const material = new THREE.MeshMatcapMaterial({
			// color: 0xfffde8,
			matcap: this.matcap
			// normalMap: this.floorNormals
		})
		// const material = new THREE.MeshStandardMaterial({
		// 	map: this.concreteDiff,
		// 	normalMap: this.concreteNor,
		// 	aoMap: this.concreteRough,
		// 	roughnessMap: this.concreteRough,
		// 	metalnessMap: this.concreteRough
		// })
		// material.normalScale.set(0.5, 0.5)

		this.floor = new THREE.Mesh(geometry, material)
		this.floor.rotation.x = -Math.PI / 2
		this.floor.position.y = -1

		this.scene.add(this.floor)
	}
}
