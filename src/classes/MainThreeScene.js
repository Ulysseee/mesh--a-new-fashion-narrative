import { WebGLRenderer, Scene, Raycaster, AmbientLight } from 'three'

import RAF from '@utils/RAF'
import config from '@utils/config'
import MyGUI from '@utils/MyGUI'
import Mouse from '@utils/Mouse'

import Camera from '@classes/Camera'
import Model from '@classes/Model'
import Floor from '@classes/Floor'
import Spline from '@classes/Spline'
import Cube from '@classes/Cube'

class MainThreeScene {
	constructor() {
		this.bind()
		this.scene
		this.cube
		this.renderer
		this.controls
		this.mouse
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

		const ambientLight = new AmbientLight(0xffffff, 0.8)
		this.scene.add(ambientLight)

		Camera.init(this.renderer)
		this.camera = Camera.camera
		Floor.init(this.scene)
		Spline.init(this.scene)
		Cube.init(this.scene)

		Model.init(this.scene)

		this.modell = Model.mesh
		// this.model.position.set(3, 10, 20)

		this.cube = Cube.mesh

		MyGUI.hide()
		if (config.myGui) MyGUI.show()

		this.mouse = Mouse.mouse

		this.raycaster = new Raycaster()

		//RENDER LOOP AND WINDOW SIZE UPDATER SETUP
		window.addEventListener('resize', this.resizeCanvas)
		window.addEventListener('mousemove', Mouse.getMousePos)
		RAF.subscribe('threeSceneUpdate', this.update)
	}

	update() {
		Spline.update()

		this.raycaster.setFromCamera(this.mouse, this.camera)

		const objectsToRaycast = [this.cube]
		const intersect = this.raycaster.intersectObjects(objectsToRaycast)

		if (intersect.length > 0) {
			document.querySelector('html, body').style.cursor = 'pointer'
		} else {
			document.querySelector('html, body').style.cursor = 'default'
		}

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
