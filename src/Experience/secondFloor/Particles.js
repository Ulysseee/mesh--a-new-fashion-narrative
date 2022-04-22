import * as THREE from 'three'
import Experience from '../Experience.js'
import { patchShaders } from 'gl-noise'

export default class Particles {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		// Resource
		this.number = 1000

		this.uniforms = {
			pointTexture: {
				value: new THREE.TextureLoader().load('/textures/parti.png')
			}
		}
		this.setModel()
	}

	setModel() {
		const radius = 200

		const geometry = new THREE.BufferGeometry()

		const positions = []
		const colors = []
		const sizes = []

		const color = new THREE.Color()

		for (let i = 0; i < this.number; i++) {
			positions.push((Math.random() * 2 - 1) * radius)
			positions.push((Math.random() * 2 - 1) * radius)
			positions.push((Math.random() * 2 - 1) * radius)

			color.setHSL(i / this.number, 1.0, 0.5)

			colors.push(color.r, color.g, color.b)

			sizes.push(20)
		}

		geometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(positions, 3)
		)
		geometry.setAttribute(
			'color',
			new THREE.Float32BufferAttribute(colors, 3)
		)
		geometry.setAttribute(
			'size',
			new THREE.Float32BufferAttribute(sizes, 1).setUsage(
				THREE.DynamicDrawUsage
			)
		)

		const particlesMaterial = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: `attribute float size;

			varying vec3 vColor;

			void main() {

				vColor = color;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_PointSize = size * ( 300.0 / -mvPosition.z );

				gl_Position = projectionMatrix * mvPosition;

			}`,
			fragmentShader: `
			uniform sampler2D pointTexture;

			varying vec3 vColor;

			void main() {

				gl_FragColor = vec4( vColor, 1.0 );

				gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

			}

`,

			transparent: true,
			size: 4,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			vertexColors: true
		})

		const particleSystem = new THREE.Points(geometry, particlesMaterial)

		this.scene.add(particleSystem)
	}

	update() {
		//  // Update particles
		// current.uniforms.u_time.value = clock.elapsedTime
	}
}
