import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Cube {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.targetQuaternion = new THREE.Quaternion()

		this.setCube()
	}

	displayInfo() {
		this.element = document.querySelector('.information')
		this.element.classList.toggle('active')
		document.querySelector('.cloth1').classList.add('active')
	}

	handleCube() {
		if (!this.cube.quaternion.equals(this.targetQuaternion)) {
			const step = 2 * this.time.delta
			this.cube.quaternion.rotateTowards(this.targetQuaternion, step)
		}
	}

	setCube() {
		const geometry = new THREE.BoxGeometry()
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		this.cube = new THREE.Mesh(geometry, material)

		this.cube.position.x = 8
		this.cube.position.y = 2

		this.cube.position.z = -25
		this.scene.add(this.cube)
		this.cube.userData.type = 'cloth1'
		this.experience.items.push(this.cube)
	}
}
