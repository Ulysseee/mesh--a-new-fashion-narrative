import MainThreeScene from './MainThreeScene'
import {
	BufferGeometry,
	CatmullRomCurve3,
	Line,
	LineBasicMaterial,
	Vector3
} from 'three'

class CameraPath {
	constructor() {
		this.bind()
		this.scene
		this.splineObject
	}

	init(scene) {
		this.scene = scene
		this.tick = 0
		this.curve = new CatmullRomCurve3([
			new Vector3(1000, 100, 0),
			new Vector3(-1000, 0, -1000),
			new Vector3(1000, 1000, -2000),
			new Vector3(-1000, 0, -3000),
			new Vector3(1000, 400, -4000)
		])

		this.curveGeometry = new BufferGeometry()
		this.curveGeometry.vertices = this.curve.getPoints(50)
		const curveMaterial = new LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new Line(this.curveGeometry, curveMaterial)

		console.log(this.scene)
		this.scene.add(this.splineObject)
	}

	update() {
		console.log('here?')
		// console.log(MainThreeScene.camera)
		// this.tick += raf.deltaTime * 0.01
		this.tick += 0.0001
		const camPos = this.curve.getPoint(this.tick)
		MainThreeScene.camera.position.set(camPos.x, camPos.y, camPos.z)

		const tangent = this.curve.getTangent(this.tick)
		MainThreeScene.camera.rotation.y = -tangent.x

		this.percent =
			MainThreeScene.camera.position.z /
			this.curve.points[this.curve.points.length - 1].z

		// this.timeline.style.transform = `scaleX(${this.percent})`
	}

	bind() {}
}

const _instance = new CameraPath()
export default _instance
