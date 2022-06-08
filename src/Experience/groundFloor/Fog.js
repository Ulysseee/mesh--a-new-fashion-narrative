import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Fog {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setFog()
	}

	setFog() {
		// this.fog = new THREE.Fog('#f7efe3', 1, 15)
		// // this.fog = new THREE.FogExp2(0xefd1b5, 0.0025)

		// this.scene.fog = this.fog
		// const fog = new THREE.Fog('#f7efe3', 16, 32)
		const fog = new THREE.Fog('#262837', 16, 32)
		// const fog = new THREE.Fog('#a1948d', 32, 36)
		this.scene.fog = fog
	}
}
