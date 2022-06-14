import Experience from '../Experience.js'
import * as THREE from 'three'

export default class Plane {
	constructor() {
		this.experience = new Experience()

		this.scene = this.experience.scene
		this.resources = this.experience.resources

		this.about = this.resources.items.about
		this.materials = this.resources.items.materials
		this.conception = this.resources.items.conception
		this.transport = this.resources.items.transport
		this.consommation = this.resources.items.consommation

		this.setPlane()
	}

	setPlane() {
		this.geometry = new THREE.PlaneGeometry(14, 14)

		this.aboutMaterial = new THREE.MeshBasicMaterial({
			map: this.about,
			alphaTest: 0.4
		})
		this.aboutPlane = new THREE.Mesh(this.geometry, this.aboutMaterial)
		this.aboutPlane.position.set(20.5, 1.5, 0)
		this.aboutPlane.rotation.y = Math.PI / 2

		this.materialsMaterial = new THREE.MeshBasicMaterial({
			map: this.materials,
			alphaTest: 0.4
		})
		this.materialsPlane = new THREE.Mesh(
			this.geometry,
			this.materialsMaterial
		)
		this.materialsPlane.position.set(-0.6, 1, 0)
		this.materialsPlane.rotation.y = Math.PI / 2

		this.conceptionMaterial = new THREE.MeshBasicMaterial({
			map: this.conception,
			alphaTest: 0.4
		})
		this.conceptionPlane = new THREE.Mesh(
			this.geometry,
			this.conceptionMaterial
		)
		this.conceptionPlane.position.set(-13.5, 1.5, 14.75)
		this.conceptionPlane.rotation.y = Math.PI

		this.transportMaterial = new THREE.MeshBasicMaterial({
			map: this.transport,
			alphaTest: 0.4
		})
		this.transportPlane = new THREE.Mesh(
			this.geometry,
			this.transportMaterial
		)
		this.transportPlane.position.set(-1.5, 1, 0)
		this.transportPlane.rotation.y = -Math.PI / 2

		this.consoMaterial = new THREE.MeshBasicMaterial({
			map: this.consommation,
			alphaTest: 0.4
		})
		this.consoPlane = new THREE.Mesh(this.geometry, this.consoMaterial)
		this.consoPlane.position.set(-13.5, 1.5, -14.75)

		this.scene.add(
			this.aboutPlane,
			this.materialsPlane,
			this.conceptionPlane,
			this.transportPlane,
			this.consoPlane
		)
	}

	update() {}
}
