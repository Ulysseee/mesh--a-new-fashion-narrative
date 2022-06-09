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
