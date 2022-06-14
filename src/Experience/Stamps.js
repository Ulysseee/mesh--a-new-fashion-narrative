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
				position: new Vector3(6, 5, -4),
				element: document.querySelector('.point-0')
			},
			{
				position: new Vector3(1, 2.8, -1.6),
				element: document.querySelector('.point-1')
			},

			{
				position: new Vector3(4, 3, -1.6),
				element: document.querySelector('.point-2')
			},

			{
				position: new Vector3(9.5, 1.8, -3.6),
				element: document.querySelector('.point-3')
			}
		]
	}
}
