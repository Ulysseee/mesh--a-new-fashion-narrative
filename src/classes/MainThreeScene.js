import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/RAF'
import config from '../utils/config'
import MyGUI from '../utils/MyGUI'

import Floor from '../classes/Floor'

import simpleFrag from '../shaders/simple.frag'
import simpleVert from '../shaders/simple.vert'

class MainThreeScene {
	constructor() {
		this.bind()
		this.camera
		this.scene
		this.cube
		this.renderer
		this.controls
		this.y = 0
		this.position = 0
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
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		)
		this.camera.position.set(0, 0, 5)
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enabled = config.controls
		this.controls.maxDistance = 1500
		this.controls.minDistance = 0

		//DUMMY CUBE + SIMPLE GLSL SHADER LINKAGE
		const shaderMat = new THREE.ShaderMaterial({
			vertexShader: simpleVert,
			fragmentShader: simpleFrag
		})
		this.cube = new THREE.Mesh(new THREE.BoxGeometry(), shaderMat)
		this.scene.add(this.cube)

		// Floor.init(this.scene)

		MyGUI.hide()
		if (config.myGui) MyGUI.show()

		//RENDER LOOP AND WINDOW SIZE UPDATER SETUP
		window.addEventListener('resize', this.resizeCanvas)
		window.addEventListener('wheel', this.scrollCanvas)
		RAF.subscribe('threeSceneUpdate', this.update)
	}

	update() {
		this.renderer.render(this.scene, this.camera)
		this.cube.rotation.x += 0.01
		this.cube.rotation.z += 0.01

		// this.camera.position.z += 0.08
	}

	scrollCanvas(e) {
		this.y = -e.deltaY * 0.0009
		this.position += this.y
		this.y *= 0.9

		this.camera.position.y = this.position
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
		this.scrollCanvas = this.scrollCanvas.bind(this)
	}
}

const _instance = new MainThreeScene()
export default _instance
