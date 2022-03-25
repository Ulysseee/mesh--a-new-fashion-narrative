import {
	WebGLRenderer,
	Scene,
	Raycaster,
	AmbientLight,
	PointLight,
	GridHelper
} from 'three'

import RAF from '@utils/RAF'
import config from '@utils/config'
import Debug from '@utils/Debug'
import Mouse from '@utils/Mouse'

import Camera from '@classes/Camera'
import Model from '@classes/Model'
import Spline from '@classes/Spline'
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

		this.grid = new GridHelper(48, 18)
		this.grid.position.set(0, 0, -30)
		this.scene.add(this.grid)

		const ambientLight = new AmbientLight(0xffffff, 0.6)
		const pointLight = new PointLight(0xffffff, 0.35)

		pointLight.position.set(0, 10, -35)
		pointLight.castShadow = true

		this.scene.add(pointLight)
		this.scene.add(ambientLight)

		if (config.myGui) this.debug = Debug.initGui()

		Camera.init(this.renderer)
		this.camera = Camera.camera

		Spline.init(this.scene)
		Model.init(this.scene)

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
		Debug.stats.update()

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
