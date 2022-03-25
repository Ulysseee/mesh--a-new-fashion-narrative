import { Scene } from 'three'
// import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from '@utils/Resources.js'

import sources from './sources.js'

export default class Experience {
	constructor(_canvas) {
		if (Experience._instance) {
			return Experience._instance
		}

		Experience._instance = this

		// Options
		this.canvas = _canvas

		// Setup
		// this.debug = new Debug()
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new Scene()
		this.resources = new Resources(sources)
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.world = new World()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		// Time tick event
		this.update()
	}

	// setDebug() {
	// 	if (this.config.debug) {
	// 		this.debug = new GUI()
	// 	}
	// }

	// setStats() {
	// 	if (this.config.debug) {
	// 		this.stats = new Stats(true)
	// 	}
	// }

	update() {
		this.camera.update()

		if (this.world) this.world.update()

		if (this.renderer) this.renderer.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
		this.world.resize()
	}

	destroy() {}
}
