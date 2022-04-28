import { Raycaster } from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import config from '@utils/config'
import Debug from '@utils/Debug'

import Experience from '../Experience.js'
import Building from './Building.js'
import Cloth from './Cloth.js'
import Spline from './Spline.js'
import Environment from './Environment.js'
import Mouse from '@utils/Mouse'
import Sky from '@classes/shared/sky'
import Portal from './Portal'

export default class GroundFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		this.raycaster = new Raycaster()
		this.currentIntersect = null
		this.isInfosActive = false

		this.mouse = new Mouse()

		this.setPostProcessing()
		this.debugComposer()

		window.addEventListener('mousemove', this.mouse.getMousePos)
		window.addEventListener('click', () => {
			this.handleClick()
		})

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline()
			this.portal = new Portal()
			this.rdc = new Building()
			this.environment = new Environment()
			this.sky = new Sky()
			// this.cloth = new Cloth()
		})
	}

	setPostProcessing() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.effectComposer = this.experience.renderer.effectComposer
		this.effectComposer.addPass(this.unrealBloomPass)

		this.unrealBloomPass.strength = 0.783
		this.unrealBloomPass.radius = 0.0
		this.unrealBloomPass.threshold = 0.891
	}

	debugComposer() {
		if (config.gui) {
			this.debug = new Debug()

			const f = this.debug.gui.addFolder({
				title: 'Composer',
				expanded: true
			})

			f.addInput(this.unrealBloomPass, 'enabled')

			f.addInput(this.unrealBloomPass, 'enabled')
			f.addInput(this.unrealBloomPass, 'strength', {
				min: 0.00001,
				max: 2,
				step: 0.001
			})

			f.addInput(this.unrealBloomPass, 'radius', {
				min: 0.00001,
				max: 2,
				step: 0.001
			})
			f.addInput(this.unrealBloomPass, 'threshold', {
				min: 0.00001,
				max: 1,
				step: 0.001
			})
		}
	}

	handleClick() {}

	hold() {
		// Hold button with mouse / select with tab and hold spacebar

		let duration = 1600,
			success = (button) => {
				//Success function
				button.classList.add('success')
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
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersect = this.raycaster.intersectObjects(this.experience.items)

		if (intersect.length > 0) {
			document.querySelector('html, body').style.cursor = 'pointer'

			this.currentIntersect = intersect[0]
		} else {
			document.querySelector('html, body').style.cursor = 'default'
			this.currentIntersect = null
		}

		if (this.spline) this.spline.update()
	}

	destroy() {}
}
