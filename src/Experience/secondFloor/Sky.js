import * as THREE from 'three'

import Experience from '../Experience.js'
import { Sky } from 'three/examples/jsm/objects/Sky'
import Debug from '@utils/Debug'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setSky()
		this.setUniforms()
		this.debugSky()
	}

	setSky() {
		this.effectController = {
			turbidity: 10,
			rayleigh: 3,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			elevation: 2,
			azimuth: 180

			// exposure: renderer.toneMappingExposure
		}

		this.sky = new Sky()
		this.sky.scale.setScalar(450000)
		this.scene.add(this.sky)

		this.sun = new THREE.Vector3()
	}

	setUniforms() {
		const uniforms = this.sky.material.uniforms
		uniforms['turbidity'].value = this.effectController.turbidity
		uniforms['rayleigh'].value = this.effectController.rayleigh
		uniforms['mieCoefficient'].value = this.effectController.mieCoefficient
		uniforms['mieDirectionalG'].value =
			this.effectController.mieDirectionalG

		const phi = THREE.MathUtils.degToRad(
			90 - this.effectController.elevation
		)
		const theta = THREE.MathUtils.degToRad(this.effectController.azimuth)

		this.sun.setFromSphericalCoords(1, phi, theta)

		uniforms['sunPosition'].value.copy(this.sun)
	}

	debugSky() {
		this.debug = new Debug()

		const f = this.debug.gui.addFolder({
			title: 'Sky',
			expanded: true
		})

		f.addInput(this.effectController, 'turbidity', {
			min: 0.00001,
			max: 20,
			step: 0.1
		})

		f.addInput(this.effectController, 'rayleigh', {
			min: 0.00001,
			max: 4,
			step: 0.001
		})

		f.addInput(this.effectController, 'mieCoefficient', {
			min: 0.00001,
			max: 0.1,
			step: 0.001
		})

		f.addInput(this.effectController, 'mieDirectionalG', {
			min: 0.00001,
			max: 1,
			step: 0.001
		})

		f.addInput(this.effectController, 'elevation', {
			min: 0.00001,
			max: 90,
			step: 0.1
		})

		f.addInput(this.effectController, 'azimuth', {
			min: -180,
			max: 180,
			step: 0.1
		})

		f.on('change', () => {
			this.setUniforms()
		})
	}
}
