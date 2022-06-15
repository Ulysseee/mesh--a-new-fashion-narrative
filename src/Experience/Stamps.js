import { Vector3 } from 'three'
import Experience from './Experience.js'

export default class Stamps {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.camera = this.experience.camera

		this.setPoints()
	}

	setPoints() {
		this.points = [
			{
				position: new Vector3(3.3, 3.2, 1),
				element: document.querySelector('.point-0')
			},
			{
				position: new Vector3(-5.3, 3.2, -1),
				element: document.querySelector('.point-1')
			}
		]
	}
}
