import {
	BufferGeometry,
	LineBasicMaterial,
	Line,
	Object3D,
	Mesh,
	BoxGeometry,
	MeshBasicMaterial
} from 'three'
import EventEmitter from '@utils/EventEmitter.js'

import gsap, { Power3 } from 'gsap'

import Experience from '../Experience'

import { cameraTargetPositions } from '../pathes'

export default class Spline extends EventEmitter {
	constructor(catmullCurve) {
		super()

		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.mouse = this.experience.mouse
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug

		this.intensity = 0.00006
		this.scroll = {
			current: 0,
			target: 0,
			last: 0
			// limit: 2
		}

		this.setSpline(catmullCurve)
		if (this.debug) this.setDebug()

		window.addEventListener('wheel', (e) => {
			if (!this.experience.selectedItem) {
				this.scrollCanvas(e)
				this.trigger('wheel')
				this.experience.lastScrollTime = new Date().getTime()
			}
		})
	}

	setSpline(catmullCurve) {
		this.curve = catmullCurve

		const points = this.curve.getPoints(50)
		this.curveGeometry = new BufferGeometry().setFromPoints(points)
		this.curveMaterial = new LineBasicMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0
		})
		this.splineObject = new Line(this.curveGeometry, this.curveMaterial)

		// this.cameraTarget = new Object3D()
		this.cameraTarget = new Mesh(
			new BoxGeometry(1, 1, 1),
			new MeshBasicMaterial({ color: 0xffff00 })
		)
		this.cameraTarget.position.set(21, 2.5, 0)
		this.scene.add(this.splineObject, this.cameraTarget)
	}

	scrollCanvas({ deltaY }) {
		this.scroll.target += deltaY * this.intensity
	}

	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'Scroll',
			expanded: true
		})

		f.addInput(this, 'intensity', {
			min: 0.00001,
			max: 0.00009,
			step: 0.00001
		})
	}

	resetPosition() {
		let tl = gsap.timeline({
			onComplete: () => {
				this.experience.selectedItem = false
			}
		})

		tl.to(this.cameraTarget.position, {
			duration: 2,
			x: this.experience.savedtargetPosition.x,
			y: this.experience.savedtargetPosition.y,
			z: this.experience.savedtargetPosition.z,
			delay: 1,
			ease: Power3.easeOut
		})
	}

	update(percent) {
		// console.log(percent)
		this.scroll.target = gsap.utils.clamp(
			0,
			this.scroll.limit,
			this.scroll.target
		)

		this.scroll.current = gsap.utils.interpolate(
			this.scroll.current,
			this.scroll.target,
			0.03
		)

		const camPos = this.curve.getPoint(this.scroll.current)

		if (!this.experience.selectedItem)
			this.camera.instance.position.set(camPos.x, camPos.y, camPos.z)

		this.camera.instance.lookAt(this.cameraTarget.position)

		let timeline = gsap.timeline()

		if (percent && !this.experience.selectedItem) {
			if (percent < 0.25) {
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[0].x,
					y: cameraTargetPositions[0].y,
					z: cameraTargetPositions[0].z
				})
			} else if (percent < 0.368) {
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[1].x,
					y: cameraTargetPositions[1].y,
					z: cameraTargetPositions[1].z
				})
			} else if (percent < 0.4) {
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[2].x,
					y: cameraTargetPositions[2].y,
					z: cameraTargetPositions[2].z
				})
			} else if (percent < 0.47) {
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[3].x,
					y: cameraTargetPositions[3].y,
					z: cameraTargetPositions[3].z
				})
			} else if (percent < 0.532) {
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[4].x,
					y: cameraTargetPositions[4].y,
					z: cameraTargetPositions[4].z
				})
			} else if (percent < 0.635) {
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[5].x,
					y: cameraTargetPositions[5].y,
					z: cameraTargetPositions[5].z
				})
			} else if (percent < 0.75) {
				console.log('kljhsdkqjhs')
				timeline.to(this.cameraTarget.position, {
					duration: 1,
					x: cameraTargetPositions[5].x,
					y: cameraTargetPositions[5].y,
					z: cameraTargetPositions[5].z
				})
			}
		}
	}
}
