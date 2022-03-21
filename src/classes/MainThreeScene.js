import * as THREE from 'three'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/RAF'
import config from '../utils/config'
import MyGUI from '../utils/MyGUI'

import Floor from '../classes/Floor'
import Spline from '../classes/Spline'

import simpleFrag from '../shaders/simple.frag'
import simpleVert from '../shaders/simple.vert'

class MainThreeScene {
	constructor() {
		this.bind()
		this.scene
		this.camera
		this.cube
		this.renderer
		this.controls
		this.y = 0
		this.position = 0
		this.tick = 0
		this.spline
	}

	init(container) {
		//RENDERER SETUP
		this.renderer = new THREE.WebGLRenderer({ antialias: true })
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.debug.checkShaderErrors = true
		container.appendChild(this.renderer.domElement)

		//MAIN SCENE INSTANCE
		this.scene = new THREE.Scene()

		//CAMERA AND ORBIT CONTROLLER
		this.camera = new THREE.PerspectiveCamera(
			100,
			window.innerWidth / window.innerHeight,
			1,
			100000
		)
		this.camera.position.set(0, 400, -200)

		// this.camera.position.copy(new THREE.Vector3(0, 0, 60))
		// this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		// this.controls.enabled = config.controls
		// this.controls.maxDistance = 1500
		// this.controls.minDistance = 0

		//DUMMY CUBE + SIMPLE GLSL SHADER LINKAGE
		this.shaderMat = new THREE.ShaderMaterial({
			vertexShader: simpleVert,
			fragmentShader: simpleFrag
		})
		this.cube = new THREE.Mesh(new THREE.BoxGeometry(), this.shaderMat)
		// this.scene.add(this.cube)

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
