import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadingManager from './LoadingClass'

class Model {
	constructor() {
		this.bind()
		this.mesh
		this.modelLoader = new GLTFLoader(LoadingManager)
	}

	init(scene) {
		this.scene = scene

		this.modelLoader.load('/Fox/glTF/Fox.gltf', (gltf) => {
			gltf.scene.traverse((child) => {
				console.log(child)
				if (child instanceof Mesh) {
					gltf.scene.scale.set(0.025, 0.025, 0.025)
				}
			})
			gltf.scene.position.set(2, 2, -4)
			this.scene.add(gltf.scene)
		})
	}

	update() {}

	bind() {}
}

const _instance = new Model()
export default _instance
