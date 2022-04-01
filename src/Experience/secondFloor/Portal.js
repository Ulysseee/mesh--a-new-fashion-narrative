import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setPortal()
	}

	setPortal() {
		this.geometry = new THREE.PlaneGeometry(5, 5)
		this.material = new THREE.MeshBasicMaterial({
			color: 0xffff00,
			side: THREE.DoubleSide
		})
		this.portal = new THREE.Mesh(this.geometry, this.material)
		this.portal.position.set(0, 3, -10)
		this.scene.add(this.portal)
	}
}
