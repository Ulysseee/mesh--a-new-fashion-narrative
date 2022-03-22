import { ShaderMaterial, Mesh, BoxGeometry } from 'three'

import simpleFrag from '@shaders/simple.frag'
import simpleVert from '@shaders/simple.vert'

class Cube {
	constructor() {
		this.bind()
		this.mesh
	}

	init(scene) {
		this.scene = scene

		const shaderMat = new ShaderMaterial({
			vertexShader: simpleVert,
			fragmentShader: simpleFrag
		})
		this.mesh = new Mesh(new BoxGeometry(64, 64, 64), shaderMat)
		this.scene.add(this.mesh)
	}

	update() {}

	bind() {}
}

const _instance = new Cube()
export default _instance
