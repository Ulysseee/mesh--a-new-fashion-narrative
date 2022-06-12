import * as THREE from 'three'
import Experience from '../Experience.js'
import firefliesFragmentShader from '@shaders/fireflies/fragment.glsl'
import firefliesVertexShader from '@shaders/fireflies/vertex.glsl'

export default class Particles {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		this.setModel()
	}

	setModel() {
		this.firefliesGeometry = new THREE.BufferGeometry()
		this.firefliesCount = 75
		this.positionArray = new Float32Array(this.firefliesCount * 3)
		this.scaleArray = new Float32Array(this.firefliesCount)

		for (let i = 0; i < this.firefliesCount; i++) {
			this.positionArray[i * 3 + 0] = (Math.random() - 0.5) * 150
			this.positionArray[i * 3 + 1] = Math.random() * 30
			this.positionArray[i * 3 + 2] = (Math.random() - 0.5) * 150

			this.scaleArray[i] = Math.random()
		}

		this.firefliesGeometry.setAttribute(
			'position',
			new THREE.BufferAttribute(this.positionArray, 3)
		)
		this.firefliesGeometry.setAttribute(
			'aScale',
			new THREE.BufferAttribute(this.scaleArray, 1)
		)

		// Material
		this.firefliesMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uSize: { value: 500 },
				uTime: { value: 0 },
				uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
			},
			vertexShader: firefliesVertexShader,
			fragmentShader: firefliesFragmentShader,
			// transparent: true
			blending: THREE.AdditiveBlending,
			depthWrite: false
		})

		this.particleSystem = new THREE.Points(
			this.firefliesGeometry,
			this.firefliesMaterial
		)

		this.scene.add(this.particleSystem)
	}

	update() {
		this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 0.005
	}
}
