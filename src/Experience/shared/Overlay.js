import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Overlay {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setOverlay()
	}

	setOverlay() {
		const geometry = new THREE.PlaneGeometry(10, 10, 5, 5)
		this.material = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 0 }
			},
			vertexShader: `
				void main()
				{
					gl_Position = vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform float uAlpha;
				void main()
				{
					gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
				}
			`
		})

		this.material.needsUpdate = true
		this.mesh = new THREE.Mesh(geometry, this.material)
		this.mesh.name = 'loader'
		this.scene.add(this.mesh)
	}

	update() {}
}
