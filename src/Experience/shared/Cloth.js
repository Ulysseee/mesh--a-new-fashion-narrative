import Experience from '../Experience'

export default class Cloth {
	constructor() {
		this.experience = new Experience()
	}

	moveCamera() {
		this.experience.selectedItem = true
	}

	displayInfo(el) {
		document.querySelector('.information').classList.toggle('active')
		document.querySelector(el).classList.add('active')
	}

	// update() {
	// 	if (this.experience.infoOpen) {
	// 		// this.instance.rotation.x = -this.mouse.mouseRotation.x
	// 		// this.instance.rotation.y = this.mouse.mouseRotation.y
	// 	}
	// }
}
