import { PerspectiveCamera } from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import config from '@utils/config'
import { Circ } from 'gsap'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas
		this.mouse = this.experience.mouse

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			200
		)
		this.instance.position.set(0, 0, 10)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enabled = config.controls

		// this.controls.enableDamping = true
		this.controls.maxDistance = 1500
		this.controls.minDistance = 0
		this.controls.enableZoom = false
		this.controls.enablePan = false
	}

	resetPosition() {
		let tl = gsap.timeline({
			onComplete: () => {
				this.experience.selectedItem = false
			}
		})

		tl.to(this.instance.position, {
			duration: 2,
			x: this.experience.savedPosition.x,
			y: this.experience.savedPosition.y,
			z: this.experience.savedPosition.z,
			ease: Circ.easeOut
		})
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		if (this.controls) this.controls.update()
		if (this.experience.infoOpen) {
			// this.instance.rotation.x += -this.mouse.mouseRotation.x
			// this.instance.rotation.y += this.mouse.mouseRotation.y
		}
	}
}
