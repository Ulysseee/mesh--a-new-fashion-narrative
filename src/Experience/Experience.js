import * as THREE from 'three'
import gsap, { Power3 } from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'

import config from '@utils/config'
import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Resources from '@utils/Resources.js'
import Cursor from '@classes/Cursor.js'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Raycaster from './Raycaster'
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
		this.anims = new Anims()

		// Setup
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()
		this.cursor = new Cursor(document.querySelectorAll('.cursor'))
		this.resources = new Resources(groundFloor)

		this.camera = new Camera()

		this.items = []

		this.infoOpen = false

		const scroll = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true
		})

		this.timeline1 = document.querySelector(
			'.header__timeline__1--progress'
		)
		this.timeline2 = document.querySelector(
			'.header__timeline__2--progress'
		)
		this.raycaster = new Raycaster()

		this.renderer = new Renderer()

		this.groundFloor = new GroundFloor()

		this.setDebug()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		this.overlayGeometry = new THREE.PlaneGeometry(10, 10, 5, 5)
		this.overlayMaterial = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 0 }
			},
			vertexShader: `
				void main()
				{
					gl_Position = vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform float uAlpha;

				void main()
				{
					gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
				}
			`
		})

		this.overlayMaterial.needsUpdate = true
		this.overlay = new THREE.Mesh(
			this.overlayGeometry,
			this.overlayMaterial
		)
		this.overlay.name = 'loader'
		this.scene.add(this.overlay)

		let duration = 1600,
			success = (button) => {
				//Success function
				// button.classList.add('success')
				button.style.opacity = 0

				this.switch()
			}

		document.querySelectorAll('.button-hold').forEach((button) => {
			button.style.setProperty('--duration', duration + 'ms')
			;['mousedown', 'touchstart', 'keypress'].forEach((e) => {
				button.addEventListener(e, (ev) => {
					if (
						e != 'keypress' ||
						(e == 'keypress' &&
							ev.which == 32 &&
							!button.classList.contains('process'))
					) {
						button.classList.add('process')
						button.timeout = setTimeout(success, duration, button)
					}
				})
			})
			;['mouseup', 'mouseout', 'touchend', 'keyup'].forEach((e) => {
				button.addEventListener(
					e,
					(ev) => {
						if (e != 'keyup' || (e == 'keyup' && ev.which == 32)) {
							button.classList.remove('process')
							clearTimeout(button.timeout)
						}
					},
					false
				)
			})
		})

		// Time tick event
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
		this.camera.update()
		if (this.raycaster) this.raycaster.update()

		if (this.groundFloor) this.groundFloor.update()
		if (this.secondFloor) this.secondFloor.update()

		if (this.renderer) this.renderer.update()

		if (this.debug) this.debug.stats.update()

		if (this.cursor) this.cursor.cursorElements.forEach((el) => el.render())

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
	}

	async switch(level) {
		await gsap.to(this.overlayMaterial.uniforms.uAlpha, {
			duration: 1,
			value: 1,
			ease: Power3.easeInOut
		})

		this.destroy()

		switch (level) {
			case 'firstFloor':
				this.items = []
				this.timeline2.style.transform = 'scale(1)'
				this.groundFloor = null
				this.resources = new Resources(secondFloor)
				this.secondFloor = await new SecondFloor()
				break

			case 'secondFloor':
				console.log('toto')
				break

			default:
				break
		}

		gsap.to(this.overlayMaterial.uniforms.uAlpha, {
			duration: 1,
			value: 0,
			delay: 2,
			ease: Power3.easeInOut
		})
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
