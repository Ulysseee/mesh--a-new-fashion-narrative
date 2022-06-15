import * as THREE from 'three'

import config from '@utils/config'
import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Resources from '@utils/Resources.js'
import Mouse from '@utils/Mouse.js'
import Cursor from '@classes/Cursor.js'
import CamParallax from './Parallax.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Raycaster from './Raycaster'
import Overlay from './shared/Overlay.js'
import Stamps from './Stamps.js'
import Metavers from '@classes/metavers/Index.js'
import Gallery from '@classes/gallery/Index.js'

import Anims from './Anims.js'
import { gallery, metavers } from './sources.js'
import { Vector3 } from 'three'

export default class Experience {
	constructor(_canvas) {
		if (Experience._instance) {
			return Experience._instance
		}

		Experience._instance = this

		// Options
		this.canvas = _canvas
		this.isLoading = true

		// Setup
		this.closeSound = new Audio('/assets/close.mp3')
		this.openSound = new Audio('/assets/open.mp3')
		this.sizes = new Sizes()
		this.time = new Time()
		this.mouse = new Mouse()
		this.cursor = new Cursor(document.querySelectorAll('.cursor'))
		this.resources = new Resources(gallery)

		this.scene = new THREE.Scene()
		this.camera = new Camera()

		this.items = []

		this.infoOpen = false
		this.selectedItem = false
		this.savedPosition = null

		this.stamps = new Stamps()
		this.raycaster = new Raycaster()
		this.renderer = new Renderer()
		this.gallery = new Gallery()
		this.overlay = new Overlay()
		this.anims = new Anims()
		this.parallax = new CamParallax()

		this.setDebug()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		this.update()
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()

			const f = this.debug.gui.addFolder({
				title: 'config',
				expanded: true
			})

			f.addInput(config, 'controls').on('change', () => {
				this.camera.controls.enabled = !this.camera.controls.enabled
			})
		}
	}

	update() {
		// DOM
		if (this.cursor) this.cursor.cursorElements.forEach((el) => el.render())

		// WEBGL
		this.mouse.update()
		this.camera.update()
		this.overlay.update()
		if (this.parallax) this.parallax.update()

		if (this.raycaster) this.raycaster.update()
		if (this.gallery) this.gallery.update()
		if (this.metavers) this.metavers.update()
		if (this.renderer) this.renderer.update()
		if (this.debug) this.debug.stats.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
	}

	async switch(level) {
		this.isLoading = true
		await this.anims.switchIn(level)

		this.destroy()

		switch (level) {
			case 'metavers':
				this.renderer.instance.outputEncoding = THREE.LinearEncoding

				this.items = []
				this.camera.instance.position.set(-15, 7, -15)
				this.camera.instance.lookAt(0, 3, 0)

				this.gallery.unrealBloomPass.strength = 0
				this.gallery.unrealBloomPass.radius = 0
				this.gallery.unrealBloomPass.threshold = 0
				this.gallery.step1.classList.remove('is-active')
				this.gallery.step2.classList.remove('is-active')
				this.gallery.step3.classList.remove('is-active')
				this.gallery.step4.classList.remove('is-active')
				this.gallery = null
				this.selectedItem = false
				this.infoOpen = false

				this.resources = new Resources(metavers)
				this.metavers = new Metavers()
				break

			case 'gallery':
				this.renderer.instance.outputEncoding = THREE.sRGBEncoding

				this.items = []
				this.camera.instance.position.set(35, -1.5, 9)
				this.camera.instance.lookAt(21, 2.5, 0)
				this.metavers = null
				this.resources = new Resources(gallery)
				this.gallery = new Gallery()
				break

			default:
				break
		}

		await this.anims.switchOut(level)
	}

	destroy() {
		for (let i = this.scene.children.length - 1; i >= 0; i--) {
			let child = this.scene.children[i]
			if (child.name !== 'loader') {
				this.scene.remove(child)
			}
		}
	}
}
