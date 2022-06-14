import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import config from '@utils/config'
import Debug from '@utils/Debug'

import Experience from '../Experience.js'
import Bag from './Bag.js'
import Shirt from './Shirt.js'

import Sweat from './Sweat.js'
import Converse from './Converse.js'
import Jupe from './Jupe.js'
import Airmax from './Airmax.js'
import Novembre from './Novembre.js'
import Plane from './Plane.js'
import Building from './Building.js'
import Environment from './Environment.js'
import Portal from '../shared/Portal'
import Spline from '../shared/Spline'

import { galleryPath } from '../pathes'

export default class Gallery {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.raycaster = this.experience.raycaster

		this.step1 = document.querySelector('.step1')
		this.step2 = document.querySelector('.step2')
		this.step3 = document.querySelector('.step3')
		this.step4 = document.querySelector('.step4')

		this.setPostProcessing()
		this.debugComposer()

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline(galleryPath)

			this.portal = new Portal()
			this.portal.mesh.name = 'portal1'
			this.portal.mesh.userData.type = 'portail'
			this.portal.mesh.position.set(15, 4, 0)

			this.environment = new Environment()
			this.plane = new Plane()
			this.Building = new Building()
			this.bag = new Bag()
			this.airmax = new Airmax()
			this.converse = new Converse()
			this.jupe = new Jupe()
			this.novembre = new Novembre()
			// this.shoes = new Shoes()
			// this.shirt = new Shirt()
			// this.jogging = new Jogging()
			// this.sweat = new Sweat()
			// this.jacket = new Jacket()
		})
	}

	setPostProcessing() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.effectComposer = this.experience.renderer.effectComposer
		this.effectComposer.addPass(this.unrealBloomPass)

		this.unrealBloomPass.strength = 0.31
		this.unrealBloomPass.radius = 0.413
		this.unrealBloomPass.threshold = 0.576
	}

	debugComposer() {
		if (config.gui) {
			this.debug = new Debug()

			const f = this.debug.gui.addFolder({
				title: 'Composer',
				expanded: true
			})

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

	handleClick() {
		this.experience.savedPosition = this.camera.instance.position.clone()

		if (this.raycaster.currentIntersect.object.userData.name === 'cloth1') {
			this.experience.selectedItem = true

			this.experience.anims.reviewModel(
				this.camera.instance,
				this.raycaster.currentIntersect.object
			)

			this.bag.displayInfo('.cloth1')
			this.experience.infoOpen = true
		} else if (
			this.raycaster.currentIntersect.object.userData.name === 'cloth2'
		) {
			this.experience.selectedItem = true
			// this.spline.scroll.target = 0.3

			this.experience.anims.reviewModel(
				this.camera.instance,
				this.raycaster.currentIntersect.object
			)

			this.jacket.displayInfo('.cloth2')
			this.experience.infoOpen = true
		}
	}

	update() {
		if (this.bag) this.bag.update()
		if (this.portal) this.portal.update()
		if (this.spline) {
			const decimalStr = `0.${
				this.spline.scroll.current.toString().split('.')[1]
			}`
			const decimalNbr = Number(decimalStr)

			this.percent = this.spline.curve.getUtoTmapping(decimalNbr)

			if (this.percent)
				if (this.percent < 0.35 || this.percent > 0.76) {
					this.step1.classList.remove('is-active')
				} else if (this.percent < 0.373) {
					this.step1.classList.add('is-active')
					this.step3.classList.remove('is-active')
				} else if (this.percent < 0.4) {
					this.step3.classList.add('is-active')
					this.step1.classList.remove('is-active')
					this.step4.classList.remove('is-active')
				} else if (this.percent < 0.43) {
					this.step4.classList.add('is-active')
					this.step3.classList.remove('is-active')
					this.step2.classList.remove('is-active')
				} else if (this.percent < 0.55) {
					this.step2.classList.add('is-active')
					this.step4.classList.remove('is-active')
					this.step1.classList.remove('is-active')
				} else if (this.percent < 0.76) {
					this.step1.classList.add('is-active')
					this.step2.classList.remove('is-active')
				}

			if (!this.experience.selectedItem && !this.experience.isLoading) {
				this.spline.update(this.percent)
			}
		}
	}
}
