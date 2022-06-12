import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import config from '@utils/config'
import Debug from '@utils/Debug'

import Experience from '../Experience.js'
import Cube from './Cube.js'
import Cone from './Cone.js'
import Dress from './Dress.js'
import Floor from './Floor.js'
import Building from './Building.js'
import Fog from './Fog.js'
import Environment from './Environment.js'
import Sky from '@classes/shared/sky'
import Portal from '../shared/Portal'
import Spline from '../shared/Spline'

import gsap, { Power3 } from 'gsap'

import { groundFloorPath } from '../pathes'

export default class GroundFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera
		this.raycaster = this.experience.raycaster

		this.school = document.querySelector('.school')
		this.room = document.querySelector('.lounge')
		this.court = document.querySelector('.court')

		this.setPostProcessing()
		this.debugComposer()

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline(groundFloorPath)

			this.portal = new Portal()
			this.portal.mesh.name = 'portal1'
			this.portal.mesh.userData.type = 'portail'

			this.environment = new Environment()
			this.sky = new Sky()
			this.Building = new Building()
			// this.dress = new Dress()
			this.testCube = new Cube()
			this.testCone = new Cone()
			// this.floor = new Floor()
			// this.fog = new Fog()
		})
	}

	setPostProcessing() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.effectComposer = this.experience.renderer.effectComposer
		this.effectComposer.addPass(this.unrealBloomPass)

		this.unrealBloomPass.strength = 0.35
		this.unrealBloomPass.radius = 0.5
		this.unrealBloomPass.threshold = 0.98
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

	handleClick() {
		if (this.raycaster.currentIntersect.object.userData.type === 'cloth1') {
			this.experience.selectedItem = true

			this.experience.savedPosition =
				this.camera.instance.position.clone()
			const timeline = gsap.timeline({
				onComplete: () => {
					this.experience.parallax.active = true
				}
			})

			timeline.to(this.camera.instance.position, {
				duration: 1.75,
				x: this.testCube.cube.position.x,
				y: this.testCube.cube.position.y,
				z: this.testCube.cube.position.z - 3,
				ease: Power3.easeOut
			})

			this.testCube.displayInfo('.cloth1')
			this.experience.infoOpen = true
		} else if (
			this.raycaster.currentIntersect.object.userData.type === 'cloth2'
		) {
			this.spline.scroll.target = 0.3

			this.testCone.displayInfo('.cloth2')
			this.experience.infoOpen = true
		} else if (
			this.raycaster.currentIntersect.object.userData.type === 'cloth3'
		) {
			this.experience.selectedItem = true

			this.experience.savedPosition =
				this.camera.instance.position.clone()
			gsap.to(this.camera.instance.position, {
				duration: 2,
				x: this.testCone.cone.position.x,
				y: this.testCone.cone.position.y,
				z: this.testCone.cone.position.z - 2
			})

			this.testCone.displayInfo('.cloth3')
			this.experience.infoOpen = true
		}
	}

	update() {
		if (this.testCube) this.testCube.update()
		if (this.portal) this.portal.update()
		if (this.spline) {
			const decimalStr = `0.${
				this.spline.scroll.current.toString().split('.')[1]
			}`
			const decimalNbr = Number(decimalStr)

			this.percent = this.spline.curve.getUtoTmapping(decimalNbr)

			if (this.percent < 0.25) {
				this.school.classList.add('is-active')
				this.room.classList.remove('is-active')
				this.court.classList.remove('is-active')
			} else if (this.percent < 0.5) {
				this.school.classList.remove('is-active')
				this.court.classList.add('is-active')
				this.room.classList.remove('is-active')
			} else {
				this.court.classList.remove('is-active')
				this.room.classList.add('is-active')
				this.school.classList.remove('is-active')
			}

			if (!this.experience.selectedItem && !this.experience.isLoading) {
				this.spline.update()
			}
		}
	}
}
