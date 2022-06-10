import Experience from '../Experience'

export default class Cloth {
	constructor() {
		this.experience = new Experience()
		this.anims = this.experience.anims
	}

	moveCamera() {
		this.experience.selectedItem = true
	}

	displayInfo() {
		this.anims.infoModal()
	}

	// update() {
	// 	if (this.experience.infoOpen) {
	// 		// this.instance.rotation.x = -this.mouse.mouseRotation.x
	// 		// this.instance.rotation.y = this.mouse.mouseRotation.y
	// 	}
	// }
}
