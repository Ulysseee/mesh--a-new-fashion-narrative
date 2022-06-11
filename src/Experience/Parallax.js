import Experience from './Experience.js'
import gsap from 'gsap'

export default class CamParallax {
	constructor() {
		this.experience = new Experience()
		this.camera = this.experience.camera
		this.debug = this.experience.debug
		this.mouse = this.experience.mouse
		console.log(this.experience.groundFloor)
		console.log(this.experience.groundFloor.portal)
		this.active = false
	}

	update() {
		if (!this.active) return

		// this.camera.instance.lookAt(this.experience.testCube.position)
		this.camera.instance.position.x += this.mouse.delayedMousePos.x * 0.005
		this.camera.instance.position.y += -this.mouse.delayedMousePos.y * 0.005

		// this.camera.instance.rotation.x = this.mouse.mouseRotation.x
		// this.camera.instance.rotation.y = this.mouse.mouseRotation.y
	}
}
