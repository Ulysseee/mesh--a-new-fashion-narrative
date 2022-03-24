import {
	CatmullRomCurve3,
	Vector3,
	BufferGeometry,
	LineBasicMaterial,
	Line
} from 'three'

import gsap from 'gsap'

import MyGUI from '@utils/MyGUI'

import MainThreeScene from '@classes/MainThreeScene'

class Spline {
	constructor() {
		this.bind()
		this.scene
		this.intensity = 0.00008
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

		const scrollFolder = MyGUI.addFolder('Scroll')
		scrollFolder
			.add(this, 'intensity')
			.min(0.00001)
			.max(0.00009)
			.step(0.00001)
			.name('Scroll strength')

		window.addEventListener('wheel', this.scrollCanvas)
	}

	scrollCanvas({ deltaY }) {
		this.scroll.target += deltaY * this.intensity
	}

	update() {
		// console.log(MainThreeScene.camera.rotation)
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
		MainThreeScene.camera.position.set(camPos.x, camPos.y + 2.5, camPos.z)

		// if (
		// 	MainThreeScene.camera.position.z <=
		// 		this.curve.points[this.curve.points.length - 1].z &&
		// ) {
		// 	console.log(MainThreeScene.camera.position.z)
		// 	console.log(this.curve.points[this.curve.points.length - 1].z)
		// 	this.scroll.current = 0
		// 	this.scroll.target = 0
		// 	MainThreeScene.camera.position.z = 0
		// }

		const tangent = this.curve.getTangent(this.scroll.current)
		MainThreeScene.camera.rotation.y = -tangent.x
	}

	bind() {
		this.scrollCanvas = this.scrollCanvas.bind(this)
	}
}

const _instance = new Spline()
export default _instance
