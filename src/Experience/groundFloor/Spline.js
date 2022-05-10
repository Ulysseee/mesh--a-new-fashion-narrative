import {
	Vector3,
	BufferGeometry,
	LineBasicMaterial,
	LineLoop,
	CatmullRomCurve3
} from 'three'

import gsap from 'gsap'

import Experience from '../Experience'

export default class Spline {
	constructor() {
		this.bind()

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

		this.setSpline()
		if (this.debug) this.setDebug()

		window.addEventListener('wheel', this.scrollCanvas)
	}

	setSpline() {
		this.curve = new CatmullRomCurve3([
			new Vector3(0, 0, 10),
			// new Vector3(0, 0, 0),
			new Vector3(-3, 0, -10),
			new Vector3(-10, 0, -25),
			new Vector3(-14, 0, -34),
			new Vector3(-12, 0, -40),
			new Vector3(0, 0, -47),
			new Vector3(12, 0, -40),
			new Vector3(14, 0, -34),
			new Vector3(10, 0, -25),
			new Vector3(3, 0, -10)
		])

		const points = this.curve.getPoints(50)
		this.curveGeometry = new BufferGeometry().setFromPoints(points)
		this.curveMaterial = new LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new LineLoop(this.curveGeometry, this.curveMaterial)

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

		// const tangent = this.curve.getTangent(this.scroll.current)
		// this.camera.instance.rotation.y = -tangent.x

		this.camera.instance.lookAt(0, 0, -32)
	}

	bind() {
		this.scrollCanvas = this.scrollCanvas.bind(this)
	}
}
