import { WebGLRenderer, Scene } from 'three'

import RAF from '@utils/RAF'
import config from '@utils/config'
import MyGUI from '@utils/MyGUI'

import Camera from '@classes/Camera'
import Floor from '@classes/Floor'
import Spline from '@classes/Spline'

class MainThreeScene {
	constructor() {
		this.bind()
		this.scene
		this.cube
		this.renderer
		this.controls
		this.y = 0
		this.position = 0
		this.tick = 0
	}

	init(container) {
		//RENDERER SETUP
		this.renderer = new WebGLRenderer({ antialias: true })
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.debug.checkShaderErrors = true
		container.appendChild(this.renderer.domElement)

		//MAIN SCENE INSTANCE

		this.scene = new Scene()

		Camera.init(this.scene)
		this.camera = Camera.camera
		Floor.init(this.scene)
		Spline.init(this.scene)

		MyGUI.hide()
		if (config.myGui) MyGUI.show()

		//RENDER LOOP AND WINDOW SIZE UPDATER SETUP
		window.addEventListener('resize', this.resizeCanvas)
		RAF.subscribe('threeSceneUpdate', this.update)
	}

	update() {
		this.tick += 0.001

		Spline.update()

		this.renderer.render(this.scene, this.camera)
	}

	resizeCanvas() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
	}

	bind() {
		this.resizeCanvas = this.resizeCanvas.bind(this)
		this.update = this.update.bind(this)
		this.init = this.init.bind(this)
	}
}

const _instance = new MainThreeScene()
export default _instance
