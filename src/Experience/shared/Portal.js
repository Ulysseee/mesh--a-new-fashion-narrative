import { MeshBasicMaterial, BoxGeometry, Mesh } from 'three'
import Experience from '../Experience.js'

export default class Cube {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		this.setGeometry()
		this.setMaterial()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new BoxGeometry(4, 3, 0.2)
	}

	setMaterial() {
		this.material = new MeshBasicMaterial({ wireframe: true })
	}

	setMesh() {
		this.mesh = new Mesh(this.geometry, this.material)
		this.mesh.rotation.x = -Math.PI * 0.5
		this.mesh.receiveShadow = true
		this.mesh.position.set(0, 3, -7)
		this.mesh.rotation.x = 4

		this.experience.items.push(this.mesh)
		this.scene.add(this.mesh)
	}
}
