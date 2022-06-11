import Experience from '../Experience'

export default class Cloth {
	constructor() {
		this.experience = new Experience()
		this.anims = this.experience.anims
	}

	displayInfo(el) {
		document.querySelector(el).classList.add('active')
		this.anims.showInfoModal(el)
	}
}
