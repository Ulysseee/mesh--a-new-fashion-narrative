import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import config from '@utils/config'
import Debug from '@utils/Debug'

import Experience from '../Experience.js'
import Cube from './Cube.js'
import Cone from './Cone.js'
import Dress from './Dress.js'
import Floor from './Floor.js'
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
		this.timeline = document.querySelector('.header__timeline__1--progress')
		this.raycaster = this.experience.raycaster

		this.dot = document.querySelector('.header__timeline--dot1')
		this.dot.classList.add('fill')

		// this.setPostProcessing()
		// this.debugComposer()

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline(groundFloorPath)

			this.portal = new Portal()
			this.portal.mesh.name = 'portal1'
			this.portal.mesh.userData.type = 'portail'

			this.environment = new Environment()
			// this.sky = new Sky()
			this.dress = new Dress()
			this.testCube = new Cube()
			this.testCone = new Cone()
			this.floor = new Floor()
			// this.fog = new Fog()
		})
	}

	setPostProcessing() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.effectComposer = this.experience.renderer.effectComposer
		this.effectComposer.addPass(this.unrealBloomPass)

		this.unrealBloomPass.strength = 0.783
		this.unrealBloomPass.radius = 0.0
		this.unrealBloomPass.threshold = 0.989
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
			gsap.to(this.camera.instance.position, {
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
		if (this.spline) {
			this.percent = this.spline.curve.getUtoTmapping(
				this.spline.scroll.current
			)

			this.timeline.style.transform = `scaleY(${this.percent})`

			if (!this.experience.selectedItem) {
				this.spline.update()
			}
		}
	}
}
