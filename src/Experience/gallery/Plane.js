import Experience from '../Experience.js'
import * as THREE from 'three'

export default class Plane {
	constructor() {
		this.experience = new Experience()

		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.about
		this.setPlane()
	}

	setPlane() {
		this.material = new THREE.MeshBasicMaterial({
			map: this.resource,
			alphaTest: 0.4
		})
		this.geometry = new THREE.PlaneGeometry(14, 14)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.set(20.5, 1.5, 0)
		this.mesh.rotation.y = Math.PI / 2
		this.scene.add(this.mesh)
	}

	update() {}
}
