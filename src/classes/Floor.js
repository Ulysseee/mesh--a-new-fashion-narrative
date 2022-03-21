import * as THREE from 'three'

// import MyGUI from '../utils/MyGUI'

import simpleFrag from '../shaders/simple.frag'
import simpleVert from '../shaders/simple.vert'
import { DoubleSide } from 'three'

class MainThreeScene {
	constructor() {
		this.bind()
		this.scene
		this.floor
		this.controls
	}

	init(scene) {
		this.scene = scene
		this.floorGeometry = new THREE.PlaneGeometry(12, 12)
		this.floorMaterial = new THREE.ShaderMaterial({
			vertexShader: simpleVert,
			fragmentShader: simpleFrag,
			side: DoubleSide
		})
		this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial)
		this.floor.rotation.x = -Math.PI * 0.5
		this.scene.add(this.floor)
	}

	update() {}

	bind() {}
}

const _instance = new MainThreeScene()
export default _instance
