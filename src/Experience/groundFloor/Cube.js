import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Cube {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setCube()
	}

	setCube() {
		const geometry = new THREE.BoxGeometry()
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		const cube = new THREE.Mesh(geometry, material)
		this.scene.add(cube)
	}
}
