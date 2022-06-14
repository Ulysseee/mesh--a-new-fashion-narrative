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
				position: new Vector3(6, 5, -10),
				element: document.querySelector('.point-0')
			},
			{
				position: new Vector3(12, 5, 10),
				element: document.querySelector('.point-1')
			},

			{
				position: new Vector3(-6, 5, 10),
				element: document.querySelector('.point-2')
			}
		]
	}
}
