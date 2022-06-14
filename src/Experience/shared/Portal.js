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
		this.geometry = new THREE.SphereGeometry(0.7, 32, 16)
	}

	setMaterial() {
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
		this.mesh.rotation.y = Math.PI / 2
		this.experience.items.push(this.mesh)
		this.scene.add(this.mesh)
	}

	update() {
		this.mesh.rotation.z = this.time.elapsed * 0.00005
		this.mesh.rotation.x = this.time.elapsed * 0.00005

		this.material.uniforms.uTime.value = this.time.elapsed * 0.001
		this.material.uniformsNeedUpdate = true
	}
}
