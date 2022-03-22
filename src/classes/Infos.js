import { MeshBasicMaterial, Mesh } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import LoadingManager from './LoadingClass'

import MainThreeScene from '@classes/MainThreeScene'

class Infos {
	constructor() {
		this.bind()
		this.fontLoader = new FontLoader(LoadingManager)
		this.text
	}

	init(scene) {
		this.scene = scene

		this.fontLoader.load(
			'fonts/helvetiker_regular.typeface.json',
			(font) => {
				const textGeometry = new TextGeometry('Hello three.js!', {
					font: font,
					size: 0.35,
					height: 0.002,
					curveSegments: 12,
					bevelEnabled: true,
					bevelThickness: 0.03,
					bevelSize: 0.02,
					bevelOffset: 0,
					bevelSegments: 5
				})

				this.textMaterial = new MeshBasicMaterial()
				this.text = new Mesh(textGeometry, this.textMaterial)
				this.text.position.set(-1, 0, 1)
				this.text.rotateY((3 * Math.PI) / 4)

				window.addEventListener('click', this.handleClick)
			}
		)
	}

	handleClick() {
		if (MainThreeScene.currentIntersect) {
			this.scene.add(this.text)
		}
	}

	update() {}

	bind() {
		this.handleClick = this.handleClick.bind(this)
	}
}

const _instance = new Infos()
export default _instance
