import * as THREE from 'three'

import Experience from '../Experience.js'
import Sky from '@classes/shared/sky.js'
import Environment from './Environment.js'
import Building from '../firstFloor/Building.js'
import Portal from '../shared/Portal.js'
import Spline from '../shared/Spline.js'

export default class FirstFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.sky = new Sky()
			this.firstFloor = new Building()
			this.portal = new Portal()
			this.portal.mesh.name = 'portal2'
			this.spline = new Spline()

			this.spline.curve = new THREE.CatmullRomCurve3([
				new THREE.Vector3(0, 0, 10),
				new THREE.Vector3(0, 0, -10),
				new THREE.Vector3(0, 0, -25),
				new THREE.Vector3(0, 0, -34),
				new THREE.Vector3(0, 0, -40),
				new THREE.Vector3(0, 0, -47),
				new THREE.Vector3(0, 0, -50),
				new THREE.Vector3(0, 0, -60),
				new THREE.Vector3(0, 0, -70),
				new THREE.Vector3(0, 0, -80)
			])
		})
	}

	update() {
		if (this.spline) this.spline.update()
	}
}
