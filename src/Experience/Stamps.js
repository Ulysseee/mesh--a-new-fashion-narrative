import { Vector3 } from 'three'
import Experience from './Experience.js'

export default class Stamps {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.camera = this.experience.camera
		this.raycaster = this.experience.raycaster

		this.setPoints()
	}

	setPoints() {
		this.points = [
			{
				position: new Vector3(15, 2, -15),
				element: document.querySelector('.point-0')
			}
			// {
			// 	position: new Vector3(0.5, 0.8, - 1.6),
			// 	element: document.querySelector('.point-1')
			// }
		]
	}

	// update() {
	// 	if (this.raycaster.currentIntersect) {
	// 		for (const point of this.points) {
	// 			const screenPosition = point.position.clone()
	// 			screenPosition.project(this.camera.instance)

	// 			const translateX = screenPosition.x * this.sizes.width * 0.5
	// 			const translateY = -screenPosition.y * this.sizes.height * 0.5
	// 			point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
	// 		}
	// 	}
	// }
}
