import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import LoadingManager from './LoadingClass'

import MainThreeScene from '@classes/MainThreeScene'

class Model {
	constructor() {
		this.bind()
		this.rdc
		this.modelLoader = new GLTFLoader(LoadingManager)
		this.vetLoader = new OBJLoader(LoadingManager)
	}

	init(scene) {
		this.scene = scene

		try {
			this.modelLoader.load('/models/rdc.glb', (gltf) => {
				gltf.scene.traverse((child) => {
					if (child instanceof Mesh) {
						// gltf.scene.scale.set(0.025, 0.025, 0.025)
					}
				})
				gltf.scene.position.set(0, 0, -32)
				this.rdc = gltf.scene
				this.scene.add(this.rdc)
			})
		} catch (error) {
			console.log(error)
		}

		try {
			this.vetLoader.load('/models/cloth.obj', (gltf) => {
				gltf.traverse((child) => {
					if (child instanceof Mesh) {
						child.scale.set(0.0225, 0.0225, 0.0225)
					}
				})
				gltf.position.set(0, 0, -32)

				this.cloth = gltf
				this.scene.add(this.cloth)
			})
		} catch (error) {
			console.log(error)
		}

		window.addEventListener('click', this.handleClick)
	}

	handleClick() {
		if (MainThreeScene.currentIntersect) {
			console.log(MainThreeScene.isInfosActive)
			MainThreeScene.isInfosActive = true
			// MainThreeScene.isInfosActive
			// 	? (MainThreeScene.isInfosActive = false)
			// 	: (MainThreeScene.isInfosActive = true)
			console.log(MainThreeScene.isInfosActive)
		}
	}

	update() {}

	bind() {}
}

const _instance = new Model()
export default _instance
