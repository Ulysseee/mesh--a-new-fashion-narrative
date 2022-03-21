import * as THREE from 'three'
import MainThreeScene from './MainThreeScene'

class Spline {
	constructor() {
		this.bind()
		this.scene
		this.spline
		this.tick = 0
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

		this.curveGeometry = new THREE.BufferGeometry()
		this.curveGeometry.vertices = this.curve.getPoints(50)
		const curveMaterial = new THREE.LineBasicMaterial({
			color: 0xffffff
		})
		this.splineObject = new THREE.Line(this.curveGeometry, curveMaterial)

		this.scene.add(this.spline)
	}

	update() {
		// console.log('update')
		this.tick += 0.001

		let camPos = this.curve.getPoint(this.tick)

		MainThreeScene.camera.position.set(camPos.x, camPos.y, camPos.z)
		// console.log(MainThreeScene.camera.position)

		// const tangent = this.curve.getTangent(this.tick)
		// console.log(tangent)
		// MainThreeScene.camera.rotation.y = -tangent.x

		// let tangent = this.curve.getTangent(this.tick)
		// // console.log(tangent)
		// this.camera.rotation.y = -tangent.x
	}

	bind() {}
}

const _instance = new Spline()
export default _instance
