import { PerspectiveCamera } from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap, { Power3 } from 'gsap'
import config from '@utils/config'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		// this.renderer = this.experience.renderer.instance
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
			140
		)
		this.instance.position.set(35, -2, 4)
		this.instance.lookAt(
			33.47678508431356,
			-1.2076348846877,
			-10.775930657439488
		) // bizarre

		this.scene.add(this.instance)
	}

	setControls() {
		if (config.controls) {
			this.controls = new OrbitControls(this.instance, this.canvas)
			this.controls.enabled = config.controls

			// this.controls.enableDamping = true
			this.controls.maxDistance = 1500
			this.controls.minDistance = 0
			// this.controls.enableZoom = false
			// this.controls.enablePan = false
		}
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
			delay: 1,
			ease: Power3.easeOut
		})
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		if (this.controls) this.controls.update()
		if (this.experience.infoOpen) {
			// 	this.instance.rotation.x = this.mouse.mouseRotation.x
			// 	this.instance.rotation.y = this.mouse.mouseRotation.y
		}
	}
}
