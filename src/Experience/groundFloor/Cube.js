import * as THREE from 'three'
import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

export default class Cube extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.rdcModel

		this.setCube()
	}

	setCube() {
		this.resource.scene.scale.set(0.5, 0.5, 0.5)
		this.resource.scene.position.set(0, 0, -22)

		this.resource.scene.traverse((child) => {
			if (child.material) {
				// child.material = new THREE.MeshPhongMaterial()
			}
		})
		this.scene.add(this.resource.scene)

		const geometry = new THREE.BoxGeometry()
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		this.cube = new THREE.Mesh(geometry, material)

		this.cube.position.x = 15
		this.cube.position.y = 2

		this.cube.position.z = -15
		this.scene.add(this.cube)
		this.cube.userData.type = 'cloth1'
		this.experience.items.push(this.cube)
	}

	update() {}
}
