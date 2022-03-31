import { PerspectiveCamera, Vector3 } from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import config from '@utils/config'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(0, 0, 0)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enabled = config.controls

		this.controls.enableDamping = true
		this.controls.maxDistance = 1500
		this.controls.target = new Vector3(0, 4, 0)
		this.controls.minDistance = 0
		this.controls.update()
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()
	}
}
