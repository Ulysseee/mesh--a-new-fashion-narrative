import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadingManager from './LoadingClass'
class Model {
	constructor() {
		this.bind()
		this.fox
		this.modelLoader = new GLTFLoader(LoadingManager)
		// this.loader = new OBJLoader()
	}

	init(scene) {
		this.scene = scene

		// // load a resource
		// loader.load(
		// 	// resource URL
		// 	'models/monster.obj',
		// 	// called when resource is loaded
		// 	function (object) {
		// 		scene.add(object)
		// 	},
		// 	// called when loading is in progresses
		// 	function (xhr) {
		// 		console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
		// 	},
		// 	// called when loading has errors
		// 	function (error) {
		// 		console.log('An error happened')
		// 	}
		// )

		try {
			this.modelLoader.load('/models/rdc.glb', (gltf) => {
				console.log(gltf)
				gltf.scene.traverse((child) => {
					if (child instanceof Mesh) {
						// gltf.scene.scale.set(0.025, 0.025, 0.025)
					}
				})
				gltf.scene.rotateY(0.9)
				gltf.scene.position.set(0, 0, -10)
				this.fox = gltf.scene
				this.scene.add(this.fox)
			})
		} catch (error) {
			console.log(error)
		}
	}

	update() {}

	bind() {}
}

const _instance = new Model()
export default _instance
