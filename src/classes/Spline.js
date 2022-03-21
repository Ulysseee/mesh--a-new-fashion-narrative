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

		this.geometry = new THREE.BufferGeometry()
		this.geometry.vertices = this.curve.getPoints(50)
		this.material = new THREE.LineBasicMaterial({
			color: 0xffffff,
			linewidth: 1,
			linecap: 'round',
			linejoin: 'round'
		})

		this.spline = new THREE.Line(this.geometry, this.material)

		this.scene.add(this.spline)
	}

	update() {
		// console.log('update')
		this.tick += 0.0001

		let camPos = this.curve.getPoint(this.tick)
		// console.log(camPos)

		// console.log(MainThreeScene.camera.position)
		// MainThreeScene.camera.position.set(camPos.x, camPos.y, camPos.z)

		// let tangent = this.curve.getTangent(this.tick)
		// // console.log(tangent)
		// this.camera.rotation.y = -tangent.x
	}

	bind() {}
}

const _instance = new Spline()
export default _instance
