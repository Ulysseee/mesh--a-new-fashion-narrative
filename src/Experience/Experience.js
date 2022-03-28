import { Scene } from 'three'
import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from '@utils/Resources.js'

import sources from './sources.js'
import config from '@utils/config'

export default class Experience {
	constructor(_canvas) {
		if (Experience._instance) {
			return Experience._instance
		}

		Experience._instance = this

		// Options
		this.canvas = _canvas

		// Setup
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new Scene()
		this.resources = new Resources(sources)
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.world = new World()
		this.setDebug()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		// Time tick event
		this.update()
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()
		}
	}

	update() {
		this.camera.update()

		if (this.world) this.world.update()

		if (this.renderer) this.renderer.update()

		if (this.debug) this.debug.stats.update()

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
