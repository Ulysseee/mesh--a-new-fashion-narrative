import { WebGLRenderer, Scene, Raycaster, AmbientLight, SpotLight } from 'three'

import RAF from '@utils/RAF'
import config from '@utils/config'
import MyGUI from '@utils/MyGUI'
import Mouse from '@utils/Mouse'

import Camera from '@classes/Camera'
import Model from '@classes/Model'
import Spline from '@classes/Spline'
import Infos from '@classes/Infos'
class MainThreeScene {
	constructor() {
		this.bind()
		this.scene
		this.cube
		this.renderer
		this.raycaster
		this.currentIntersect
		this.mouse
		this.y = 0
		this.tick = 0
		this.isInfosActive = false
	}

	init(container) {
		//RENDERER SETUP
		this.renderer = new WebGLRenderer({
			antialias: true,
			logarithmicDepthBuffer: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.debug.checkShaderErrors = true

		container.appendChild(this.renderer.domElement)

		//MAIN SCENE INSTANCE

		this.scene = new Scene()

		const ambientLight = new AmbientLight(0xffffff, 0.5)
		const spotLight = new SpotLight(0xffffff)
		spotLight.position.set(10, 80, 10)

		spotLight.castShadow = true

		spotLight.shadow.mapSize.width = 1024
		spotLight.shadow.mapSize.height = 1024

		spotLight.shadow.camera.near = 500
		spotLight.shadow.camera.far = 4000
		spotLight.shadow.camera.fov = 30

		this.scene.add(spotLight)
		this.scene.add(ambientLight)

		Camera.init(this.renderer)
		this.camera = Camera.camera

		// Floor.init(this.scene)
		Spline.init(this.scene)
		Model.init(this.scene)
		Infos.init(this.scene)

		MyGUI.hide()
		if (config.myGui) MyGUI.show()

		this.mouse = Mouse.mouse

		this.raycaster = new Raycaster()

		//RENDER LOOP AND WINDOW SIZE UPDATER SETUP
		window.addEventListener('resize', this.resizeCanvas)
		window.addEventListener('mousemove', Mouse.getMousePos)
		window.addEventListener('click', this.handleClick)

		RAF.subscribe('threeSceneUpdate', this.update)
	}

	update() {
		Spline.update()

		this.raycaster.setFromCamera(this.mouse, this.camera)

		let objectsToRaycast = []

		if (Model.cloth) objectsToRaycast.push(...Model.cloth.children)

		const intersect = this.raycaster.intersectObjects(objectsToRaycast)

		if (intersect.length > 0) {
			document.querySelector('html, body').style.cursor = 'pointer'

			this.currentIntersect = intersect[0]
		} else {
			document.querySelector('html, body').style.cursor = 'default'
			this.currentIntersect = null
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
