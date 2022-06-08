import * as THREE from 'three'
import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Cone extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.targetQuaternion = new THREE.Quaternion()

		this.setCone()
	}

	setCone() {
		const geometry = new THREE.ConeGeometry(2, 5, 5)
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
