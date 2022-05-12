import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import config from '@utils/config'
import Debug from '@utils/Debug'

import Experience from '../Experience.js'
import Building from './Building.js'
import Cube from './Cube.js'
// import Cloth from './Cloth.js'
import Environment from './Environment.js'
import Mouse from '@utils/Mouse'
import Sky from '@classes/shared/sky'
import Portal from '../shared/Portal'
import Spline from '../shared/Spline'

import { goundFloorPath } from '../pathes'

export default class GroundFloor {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.camera = this.experience.camera

		this.mouse = new Mouse()

		// this.setPostProcessing()
		this.debugComposer()

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.spline = new Spline(goundFloorPath)

			this.portal = new Portal()
			this.portal.mesh.name = 'portal1'
			this.portal.mesh.userData.type = 'portail'

			this.rdc = new Building()
			this.environment = new Environment()
			this.sky = new Sky()
			this.testCube = new Cube()
			// this.cloth = new Cloth()
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

	hold() {
		// Hold button with mouse / select with tab and hold spacebar
	}

	update() {
		if (this.spline) this.spline.update()
	}
}
