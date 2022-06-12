import Experience from './Experience.js'
import gsap from 'gsap'

export default class CamParallax {
	constructor() {
		this.experience = new Experience()
		this.camera = this.experience.camera
		this.debug = this.experience.debug
		this.mouse = this.experience.mouse

		this.active = false
	}

	update() {
		if (!this.active) return

		// this.camera.instance.position.x += this.mouse.mousePos.x * 0.005
		// this.camera.instance.position.y += -this.mouse.mousePos.y * 0.005
	}
}
