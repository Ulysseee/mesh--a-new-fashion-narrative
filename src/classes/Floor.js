import * as THREE from 'three'

import MyGUI from '../utils/MyGUI'

import { DoubleSide } from 'three'

class Floor {
	constructor() {
		this.bind()
		this.scene
		this.floor
		this.controls
	}

	init(scene) {
		this.scene = scene

		this.height = 5000
		this.width = 10000

		this.geometry = new THREE.PlaneGeometry(this.height, this.width, 30, 30)
		this.material = new THREE.MeshBasicMaterial({
			wireframe: false,
			side: DoubleSide,
			color: 0x536dfe
		})

		this.floor = new THREE.Mesh(this.geometry, this.material)
		this.floor.rotation.x = -Math.PI / 2
		this.floor.position.y = -100

		this.scene.add(this.floor)
	}

	update() {}

	bind() {}
}

const _instance = new Floor()
export default _instance
