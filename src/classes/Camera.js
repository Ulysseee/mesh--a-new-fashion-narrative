import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Camera {
	constructor() {
		this.bind()
		this.controls
		this.camera
	}

	init(scene) {
		this.scene = scene

		//CAMERA AND ORBIT CONTROLLER
		this.camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		)
		this.camera.position.set(0, 0, 5)
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enabled = config.controls
		this.controls.maxDistance = 1500
		this.controls.minDistance = 0
	}

	update() {}

	bind() {
		this.init = this.init.bind(this)
	}
}

const _instance = new Camera()
export default _instance
