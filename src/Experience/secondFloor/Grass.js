import { ShaderMaterial, Object3D, PlaneGeometry, InstancedMesh } from 'three'

import Experience from '../Experience'

import grassFrag from '@shaders/grass.frag'
import grassVert from '@shaders/grass.vert'

export default class Grass {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug

		this.t = 0
		this.params = {
			instanceNumber: 200000
		}

		this.setGrass()
		if (this.debug) this.setDebug()
	}

	setGrass() {
		this.leavesMaterial = new ShaderMaterial({
			fragmentShader: grassFrag,
			vertexShader: grassVert,
			uniforms: {
				time: {
					value: 0
				}
			}
			// side: DoubleSide
		})

		const dummy = new Object3D()
		const geometry = new PlaneGeometry(0.06, 0.5, 1, 4)
		geometry.translate(0, 0.5, 0) // move grass blade geometry lowest point at 0.

		this.instancedMesh = new InstancedMesh(
			geometry,
			this.leavesMaterial,
			this.params.instanceNumber
		)

		this.scene.add(this.instancedMesh)

		// Position and scale the grass blade instances randomly.

		for (let i = 0; i < this.params.instanceNumber; i++) {
			dummy.position.set(
				(Math.random() - 0.5) * 100,
				0,
				(Math.random() - 0.5) * 100
			)

			dummy.scale.setScalar(0.5 + Math.random() * 0.5)

			dummy.rotation.y = Math.random() * Math.PI

			dummy.updateMatrix()
			this.instancedMesh.setMatrixAt(i, dummy.matrix)
		}
	}

	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'Grass',
			expanded: true
		})

		f.addInput(this.params, 'instanceNumber', {
			min: 1000,
			max: 20000,
			step: 100
		})
	}

	update() {
		this.t += 0.02

		this.leavesMaterial.uniforms.time.value = this.t
		this.leavesMaterial.uniformsNeedUpdate = true
	}
}
