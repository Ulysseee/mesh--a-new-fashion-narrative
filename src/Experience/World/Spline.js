import {
	Vector3,
	BufferGeometry,
	LineBasicMaterial,
	Line,
	CatmullRomCurve3
} from 'three'

import gsap from 'gsap'

// import Debug from '@utils/Debug'
import Experience from '../Experience'

export default class Spline {
	constructor() {
		this.bind()

		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		this.intensity = 0.00006
		this.scroll = {
			current: 0,
			target: 0,
			last: 0,
			limit: 2
		}

		this.setSpline()
		window.addEventListener('wheel', this.scrollCanvas)
	}

	setSpline() {
		this.curve = new CatmullRomCurve3([
			new Vector3(0, 0, -0),
			new Vector3(-3, 0, -20),
			new Vector3(-7, 0, -25),
			new Vector3(-11, 0, -34),
			new Vector3(-8, 0, -40),
			new Vector3(0, 0, -45),
			new Vector3(8, 0, -40),
			new Vector3(11, 0, -34),
			new Vector3(7, 0, -25),
			new Vector3(3, 0, -20)
		])

		const points = this.curve.getPoints(50)
		this.curveGeometry = new BufferGeometry().setFromPoints(points)
		this.curveMaterial = new LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new Line(this.curveGeometry, this.curveMaterial)

		this.scene.add(this.splineObject)

		// console.log(Debug)

		// const f = Debug.gui.addFolder({
		// 	title: 'Scroll',
		// 	expanded: true
		// })

		// f.addInput(this, 'intensity', {
		// 	min: 0.00001,
		// 	max: 0.00009,
		// 	step: 0.00001
		// })
	}

	scrollCanvas({ deltaY }) {
		this.scroll.target += deltaY * this.intensity
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
			0.05
		)

		const camPos = this.curve.getPoint(this.scroll.current)
		this.camera.instance.position.set(camPos.x, camPos.y + 2.5, camPos.z)

		// if (
		// 	this.camera.instance.position.z <=
		// 		this.curve.points[this.curve.points.length - 1].z &&
		// ) {
		// 	console.log(this.camera.instance.position.z)
		// 	console.log(this.curve.points[this.curve.points.length - 1].z)
		// 	this.scroll.current = 0
		// 	this.scroll.target = 0
		// 	this.camera.instance.position.z = 0
		// }

		// const tangent = this.curve.getTangent(this.scroll.current)
		// this.camera.instance.rotation.y = -tangent.x
		this.camera.instance.lookAt(0, 0, -32)
	}

	bind() {
		this.scrollCanvas = this.scrollCanvas.bind(this)
	}
}
