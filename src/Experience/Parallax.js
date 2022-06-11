import Experience from './Experience.js'

export default class CamParallax {
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug
		this.mouse = this.experience.mouse

		this.active = false
		this.params = {
			max: this.camera.instance.position.x + 1,
			min: this.camera.instance.position.x - 1
		}
	}

	update() {
		if (!this.active) return

		this.camera.instance.position.x += this.mouse.mousePos.x * 0.005
		this.camera.instance.position.y += -this.mouse.mousePos.y * 0.005
	}
}
