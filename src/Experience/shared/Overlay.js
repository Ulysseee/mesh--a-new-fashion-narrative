import * as THREE from 'three'
import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

import fShader from '@shaders/teleporter/overlay.frag'
import vShader from '@shaders/teleporter/overlay.vert'

export default class Cube extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.time = this.experience.time
		this.sizes = this.experience.sizes
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene

		this.setOverlay()
	}

	setOverlay() {
		const geometry = new THREE.PlaneGeometry(2, 2, 16, 16)
		this.material = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { type: 'f', value: 0 },
				uTime: { type: 'f', value: 0 },
				uResolution: {
					value: new THREE.Uniform(
						new THREE.Vector2(this.sizes.width, this.sizes.height)
					)
				}
			},
			vertexShader: vShader,
			fragmentShader: fShader
		})

		this.material.needsUpdate = true
		this.mesh = new THREE.Mesh(geometry, this.material)
		this.mesh.name = 'loader'
		this.scene.add(this.mesh)
	}

	update() {
		// console.log(this.time.elapsed)
		this.material.uniforms.uTime.value = this.time.elapsed * 0.001
		this.material.uniformsNeedUpdate = true
	}
}
