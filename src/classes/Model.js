import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadingManager from './LoadingClass'
class Model {
	constructor() {
		this.bind()
		this.fox
		this.modelLoader = new GLTFLoader(LoadingManager)
	}

	init(scene) {
		this.scene = scene

		this.modelLoader.load('/models/Fox/glTF/Fox.gltf', (gltf) => {
			gltf.scene.traverse((child) => {
				if (child instanceof Mesh) {
					gltf.scene.scale.set(0.025, 0.025, 0.025)
				}
			})
			// gltf.scene.position.set(2, 2, -4)
			gltf.scene.position.set(-4, 0, 2)
			gltf.scene.rotateY((3 * Math.PI) / 4)
			this.fox = gltf.scene
			this.scene.add(this.fox)
		})
	}

	update() {}

	bind() {}
}

const _instance = new Model()
export default _instance
