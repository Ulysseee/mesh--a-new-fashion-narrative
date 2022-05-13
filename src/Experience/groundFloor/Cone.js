import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Cone {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.targetQuaternion = new THREE.Quaternion()

		this.setCone()
	}

	displayInfo() {
		this.element = document.querySelector('.information')
		this.element.classList.add('active')

		document.querySelector('.cloth3').classList.add('active')
	}

	handleCone() {
		if (!this.cone.quaternion.equals(this.targetQuaternion)) {
			const step = 2 * this.time.delta
			this.cone.quaternion.rotateTowards(this.targetQuaternion, step)
		}
	}

	setCone() {
		const geometry = new THREE.ConeGeometry(2, 15, 32)
		const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
		this.cone = new THREE.Mesh(geometry, material)

		this.cone.position.x = -3
		this.cone.position.y = 2

		this.cone.position.z = -25
		this.scene.add(this.cone)
		this.cone.userData.type = 'cloth3'
		this.experience.items.push(this.cone)
	}
}
