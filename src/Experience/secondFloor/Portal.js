import * as THREE from 'three'
import Experience from '../Experience.js'
import frag from '@shaders/portal/fragment.glsl'
import vert from '@shaders/portal/vertex.glsl'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time

		this.uniforms = {
			uTime: { value: 0 },
			uColorStart: {
				value: new THREE.Color(0xafecff)
			},
			uColorEnd: { value: new THREE.Color(0xecdddd) }
		}

		this.setPortal()
	}

	setPortal() {
		this.geometry = new THREE.PlaneGeometry(4, 6)
		this.material = new THREE.ShaderMaterial({
			fragmentShader: frag,

			vertexShader: vert
		})
		this.portal = new THREE.Mesh(this.geometry, this.material)
		this.portal.position.set(0, 8, 0)
		this.scene.add(this.portal)
	}

	update() {
		this.uniforms.uTime.value += this.time.delta += 0.01
	}
}
