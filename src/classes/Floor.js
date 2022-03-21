import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'

// import MyGUI from '@utils/MyGUI'

class Floor {
	constructor() {
		this.bind()
		this.scene
		this.floor
		this.controls
	}

	init(scene) {
		this.scene = scene

		this.height = 5000
		this.width = 10000

		this.geometry = new PlaneGeometry(this.height, this.width, 30, 30)
		this.material = new MeshBasicMaterial({
			wireframe: false,
			color: 0x536dfe
		})

		this.floor = new Mesh(this.geometry, this.material)
		this.floor.rotation.x = -Math.PI / 2
		this.floor.position.y = -100

		this.scene.add(this.floor)
	}

	update() {}

	bind() {}
}

const _instance = new Floor()
export default _instance
