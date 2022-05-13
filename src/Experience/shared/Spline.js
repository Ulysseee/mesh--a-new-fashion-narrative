import { BufferGeometry, LineBasicMaterial, Line } from 'three'
import EventEmitter from '@utils/EventEmitter.js'

import gsap from 'gsap'

import Experience from '../Experience'

export default class Spline extends EventEmitter {
	constructor(catmullCurve) {
		super()

		this.experience = new Experience()
		this.canvas = this.experience.canvas
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

		// Resize event
		window.addEventListener('wheel', (e) => {
			this.scrollCanvas(e)
			this.trigger('wheel')
		})
	}

	setSpline(catmullCurve) {
		this.curve = catmullCurve

		const points = this.curve.getPoints(50)
		this.curveGeometry = new BufferGeometry().setFromPoints(points)
		this.curveMaterial = new LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new Line(this.curveGeometry, this.curveMaterial)

		this.scene.add(this.splineObject)
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

	update() {
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
		this.camera.instance.position.set(camPos.x, 2, camPos.z)

		if (
			this.camera.instance.position.z.toFixed(0) ==
				this.curve.points[this.curve.points.length - 1].z.toFixed(0) &&
			this.camera.instance.position.x.toFixed(0) ==
				this.curve.points[this.curve.points.length - 1].x.toFixed(0)
		) {
			this.scroll.current = 0
			this.scroll.target = 0
			// this.camera.instance.position.z = 0
		}

		const tangent = this.curve.getTangent(this.scroll.current)
		// console.log(Math.abs(-tangent.x))
		// console.log(-tangent.x)
		// this.camera.instance.rotation.y = -tangent.x
	}
}
