import * as THREE from 'three'

import config from '@utils/config'
import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Resources from '@utils/Resources.js'
import Mouse from '@utils/Mouse.js'
import Cursor from '@classes/Cursor.js'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Raycaster from './Raycaster'
import Overlay from './shared/Overlay.js'
import SecondFloor from '@classes/secondFloor/SecondFloor.js'
import GroundFloor from '@classes/groundFloor/GroundFloor.js'

import Anims from './Anims.js'
import { groundFloor, secondFloor } from './sources.js'

export default class Experience {
	constructor(_canvas) {
		if (Experience._instance) {
			return Experience._instance
		}

		Experience._instance = this

		// Options
		this.canvas = _canvas

		// Setup
		this.closeSound = new Audio('/assets/close.mp3')
		this.openSound = new Audio('/assets/open.mp3')
		this.sizes = new Sizes()
		this.time = new Time()
		this.mouse = new Mouse()
		this.scene = new THREE.Scene()
		this.cursor = new Cursor(document.querySelectorAll('.cursor'))
		this.resources = new Resources(groundFloor)

		this.camera = new Camera()

		this.items = []

		this.infoOpen = false
		this.selectedItem = false
		this.savedPosition = null

		this.raycaster = new Raycaster()
		this.renderer = new Renderer()
		this.groundFloor = new GroundFloor()
		this.overlay = new Overlay()
		this.anims = new Anims()

		this.setDebug()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		this.update()

		// document.addEventListener(
		// 	'click',
		// 	(event) => {
		// 		// If user either clicks X button OR clicks outside the modal window, then close modal
		// 		if (
		// 			!event.target.closest('.information') &&
		// 			this.selectedItem
		// 		) {
		// 			document
		// 				.querySelector('.information')
		// 				.classList.remove('active')

		// 			document
		// 				.querySelectorAll('.cloth')
		// 				.forEach((cloth) => cloth.classList.remove('active'))
		// 			this.lastScrollTime = new Date().getTime()
		// 			this.infoOpen = false
		// 			this.camera.resetPosition()
		// 		}
		// 	},
		// 	false
		// )
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

		if (this.raycaster) this.raycaster.update()
		if (this.groundFloor) this.groundFloor.update()
		if (this.secondFloor) this.secondFloor.update()
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
		console.log(level)
		await this.anims.switchIn(level)

		this.destroy()

		switch (level) {
			case 'secondFloor':
				this.items = []

				this.groundFloor = null
				this.selectedItem = false
				this.infoOpen = false

				this.resources = new Resources(secondFloor)
				this.secondFloor = new SecondFloor()
				break

			case 'groundFloor':
				this.items = []

				this.secondFloor = null
				this.resources = new Resources(groundFloor)
				this.groundFloor = new GroundFloor()
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
