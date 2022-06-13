import * as THREE from 'three'
import Experience from '../Experience.js'

import fShader from '@shaders/teleporter/overlay.frag'
import vShader from '@shaders/teleporter/overlay.vert'

export default class Portal {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		this.setGeometry()
		this.setMaterial()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new THREE.SphereGeometry(1, 32, 16)
	}

	setMaterial() {
		// this.material = new THREE.MeshNormalMaterial()
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { type: 'f', value: 0 }
			},
			vertexShader: vShader,
			fragmentShader: fShader,
			side: THREE.DoubleSide
		})

		this.material.needsUpdate = true
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.receiveShadow = true
		this.mesh.position.set(5, 4, 0)
		// this.mesh.position.set(20.5, 3, 0)
		this.mesh.rotation.y = Math.PI / 2
		// this.mesh.rotation.x = 4

		this.experience.items.push(this.mesh)
		this.scene.add(this.mesh)
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed * 0.001
		this.material.uniformsNeedUpdate = true
	}
}
