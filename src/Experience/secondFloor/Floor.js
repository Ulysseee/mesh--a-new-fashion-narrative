import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.setFloor()
	}

	setFloor() {
		this.height = 10
		this.width = 10

		this.geometry = new THREE.PlaneGeometry(
			this.height,
			this.width,
			200,
			200
		)
		this.material = new THREE.MeshBasicMaterial({
			wireframe: false,
			color: 0x536dfe
		})

		this.floor = new THREE.Mesh(this.geometry, this.material)
		this.floor.rotation.x = -Math.PI / 2
		this.floor.position.y = -1

		this.scene.add(this.floor)
	}
}
