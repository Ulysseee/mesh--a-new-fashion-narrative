import Experience from '../Experience'

export default class Cloth {
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug
	}

	moveCamera() {
		this.experience.selectedItem = true
	}

	displayInfo(el) {
		document.querySelector('.information').classList.toggle('active')
		document.querySelector(el).classList.add('active')
	}
}
