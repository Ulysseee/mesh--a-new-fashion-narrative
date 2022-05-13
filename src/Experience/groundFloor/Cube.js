import * as THREE from 'three'
import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Cube extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.targetQuaternion = new THREE.Quaternion()

		this.setCube()
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
