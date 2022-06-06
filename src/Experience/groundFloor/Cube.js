import * as THREE from 'three'
import Experience from '../Experience.js'
import Cloth from '../shared/Cloth.js'

import gsap, { Power3 } from 'gsap'

export default class Cube extends Cloth {
	constructor() {
		super()
		this.experience = new Experience()
		this.mouse = this.experience.mouse
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.bagModel
		this.setCube()
	}

	setCube() {
		this.resource.scale.set(0.005, 0.005, 0.005)
		this.resource.position.set(0, 0, -22)
		this.scene.add(this.resource)
		this.experience.items.push(this.resource)

		const geometry = new THREE.BoxGeometry()
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
		this.cube = new THREE.Mesh(geometry, material)

		this.cube.position.x = 15
		this.cube.position.y = 2

		this.cube.position.z = -15
		this.scene.add(this.cube)
		this.cube.userData.type = 'cloth1'
		this.experience.items.push(this.cube)
	}

	update() {
		if (this.experience.infoOpen) {
			this.cube.rotation.x = -this.mouse.mouseRotation.x
			this.cube.rotation.y = this.mouse.mouseRotation.y
		} else {
			gsap.to(this.cube.rotation, {
				duration: 1,
				x: 0,
				y: 0,
				z: 0,
				ease: Power3.easeOut
			})
		}
	}
}
