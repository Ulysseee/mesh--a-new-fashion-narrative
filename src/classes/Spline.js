import {
	CatmullRomCurve3,
	Vector3,
	BufferGeometry,
	LineBasicMaterial,
	Line
} from 'three'

import gsap from 'gsap'

import MainThreeScene from '@classes/MainThreeScene'

class Spline {
	constructor() {
		this.bind()
		this.scene
		this.scroll = {
			current: 0,
			target: 0,
			last: 0,
			limit: 2
		}
	}

	init(scene) {
		this.scene = scene

		this.curve = new CatmullRomCurve3([
			new Vector3(1000, 100, 0),
			new Vector3(-1000, 0, -1000),
			new Vector3(1000, 1000, -2000),
			new Vector3(-1000, 0, -3000),
			new Vector3(1000, 400, -4000)
		])

		const points = this.curve.getPoints(50)
		this.curveGeometry = new BufferGeometry().setFromPoints(points)
		this.curveMaterial = new LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new Line(this.curveGeometry, this.curveMaterial)

		this.scene.add(this.splineObject)

		window.addEventListener('wheel', this.scrollCanvas)
	}

	scrollCanvas({ deltaY }) {
		this.scroll.target += deltaY * 0.00009
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
		MainThreeScene.camera.position.set(camPos.x, camPos.y + 50, camPos.z)

		if (
			MainThreeScene.camera.position.z <=
			this.curve.points[this.curve.points.length - 1].z + 200
		) {
			this.scroll.current = 0
			this.scroll.target = 0
			MainThreeScene.camera.position.z = 0
		}

		const tangent = this.curve.getTangent(this.scroll.current)
		MainThreeScene.camera.rotation.y = -tangent.x
	}

	bind() {
		this.scrollCanvas = this.scrollCanvas.bind(this)
	}
}

const _instance = new Spline()
export default _instance
