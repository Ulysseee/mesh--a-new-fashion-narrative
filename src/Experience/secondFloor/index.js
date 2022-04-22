import Experience from '../Experience.js'
import Sky from './Sky.js'
import Environment from './Environment.js'
import Mouse from '@utils/Mouse'
import Grass from './Grass.js'
import Portal from './Portal.js'
import Butterfly from './Butterfly.js'
import Flower from './Flower.js'
import Particles from './Particles.js'
export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		// this.scene.fog = new THREE.Fog('lightblue', 1, 3)
		// this.scene.fog = new THREE.FogExp2(0x2f3640, 0.08)

		// this.raycaster = new Raycaster()
		// this.currentIntersect = null
		// this.isInfosActive = false

		this.mouse = new Mouse()

		// window.addEventListener('mousemove', this.mouse.getMousePos)
		// window.addEventListener('click', () => {
		// 	this.handleClick()
		// })

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.environment = new Environment()
			this.grass = new Grass()
			this.sky = new Sky()
			this.butterfly = new Butterfly()
			this.flower = new Flower()
			this.portal = new Portal()
			this.particles = new Particles()
		})
	}

	update() {
		if (this.grass) this.grass.update()
		if (this.butterfly) this.butterfly.update()
		if (this.flower) this.flower.update()
	}
}
