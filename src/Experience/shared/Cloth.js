import Experience from '../Experience'

export default class Cloth {
	constructor() {
		this.experience = new Experience()
		this.anims = this.experience.anims
	}

	moveCamera() {
		this.experience.selectedItem = true
	}

	displayInfo(el) {
		document.querySelector(el).classList.add('active')
		this.anims.showInfoModal(el)
	}

	// closeInfo() {
	// 	document.addEventListener(
	// 		'click',
	// 		function (event) {
	// 			// If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
	// 			if (
	// 				event.target.matches('.button-close-modal') ||
	// 				!event.target.closest('.modal')
	// 			) {
	// 				closeModal()
	// 			}
	// 		},
	// 		false
	// 	)

	// 	function closeModal() {
	// 		document.querySelector('.modal').style.display = 'none'
	// 	}
	// }

	// update() {
	// 	if (this.experience.infoOpen) {
	// 		// this.instance.rotation.x = -this.mouse.mouseRotation.x
	// 		// this.instance.rotation.y = this.mouse.mouseRotation.y
	// 	}
	// }
}
