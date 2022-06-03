import Experience from './Experience.js'
import Mouse from './utils/Mouse'

export default class CamParallax {
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug
		this.mouse = new Mouse()

		this.active = false
		this.mousePos = { x: 0, y: 0 }
		this.params = {
			intensity: 0.008,
			ease: 0.08
		}
	}

	update() {
		if (!this.active) return
		this.camera.instance.position.x +=
			(this.mouse.mouse.x - this.camera.instance.position.x) *
			this.params.ease
		this.camera.instance.position.y +=
			(this.mouse.mouse.y - this.camera.instance.position.y) *
			this.params.ease
	}
}
