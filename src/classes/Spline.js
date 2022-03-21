import * as THREE from 'three'
import MainThreeScene from './MainThreeScene'

class Spline {
	constructor() {
		this.bind()
		this.scene
		this.tick = 0
		this.y = 0
		this.position = 0
	}

	init(scene) {
		this.scene = scene

		this.curve = new THREE.CatmullRomCurve3([
			new THREE.Vector3(1000, 100, 0),
			new THREE.Vector3(-1000, 0, -1000),
			new THREE.Vector3(1000, 1000, -2000),
			new THREE.Vector3(-1000, 0, -3000),
			new THREE.Vector3(1000, 400, -4000)
		])

		const points = this.curve.getPoints(50)
		this.curveGeometry = new THREE.BufferGeometry().setFromPoints(points)
		this.curveMaterial = new THREE.LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new THREE.Line(
			this.curveGeometry,
			this.curveMaterial
		)

		this.scene.add(this.splineObject)

		window.addEventListener('wheel', this.scrollCanvas)
	}

	scrollCanvas(e) {
		this.y = -e.deltaY * 0.00009
		this.position += this.y
		this.y *= 0.9

		let camPos = this.curve.getPoint(this.position)
		MainThreeScene.camera.position.set(camPos.x, camPos.y + 50, camPos.z)

		if (
			MainThreeScene.camera.position.z <=
			this.curve.points[this.curve.points.length - 1].z + 100
		) {
			this.position = 0
			MainThreeScene.camera.position.z = 0
		}

		const tangent = this.curve.getTangent(this.position)
		MainThreeScene.camera.rotation.y = -tangent.x
	}

	update() {}

	bind() {
		this.scrollCanvas = this.scrollCanvas.bind(this)
	}
}

const _instance = new Spline()
export default _instance
