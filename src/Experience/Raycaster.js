import * as THREE from 'three'
import Mouse from './utils/Mouse'
import Experience from './Experience'

export default class Raycaster {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		this.mouse = new Mouse()
		this.onPortal = null
		this.currentIntersect = null
		this.raycaster = new THREE.Raycaster()
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)

		console.log(this.experience.items)

		if (intersects.length > 0) {
			this.currentIntersect = intersects[0]

			console.log('something')

			if (this.currentIntersect.object.name === 'portal') {
				console.log('portal')
				this.onPortal = true
				this.experience.cursor.enter()
			}
		} else {
			this.experience.cursor.leave()
			this.onPortal = null
		}
	}
}
