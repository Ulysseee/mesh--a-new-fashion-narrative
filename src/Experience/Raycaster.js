import { Raycaster as ThreeRaycaster } from 'three'
import Mouse from './utils/Mouse'
import Experience from './Experience'
import gsap, { Power3 } from 'gsap'

export default class Raycaster {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.cursor = this.experience.cursor.cursorElements[0].DOM.inner

		this.mouse = new Mouse()
		this.onPortal = null
		this.currentIntersect = null
		this.raycaster = new ThreeRaycaster()

		this.container = document.querySelector('#app')
		this.duration = 1400
		;['mousedown', 'touchstart', 'keypress'].forEach((e) => {
			this.container.addEventListener(e, (ev) => {
				if (
					e != 'keypress' ||
					(e == 'keypress' &&
						ev.which == 32 &&
						!this.cursor.classList.contains('process'))
				) {
					if (
						this.currentIntersect &&
						this.currentIntersect.object.userData.type === 'portail'
					) {
						this.cursor.classList.add('process')
						this.cursor.timeout = setTimeout(
							this.success.bind(this),
							this.duration,
							this.currentIntersect
						)
					}
				}
			})
		})
		;['mouseup', 'mouseout', 'touchend', 'keyup'].forEach((e) => {
			this.container.addEventListener(
				e,
				(ev) => {
					if (e != 'keyup' || (e == 'keyup' && ev.which == 32)) {
						this.cursor.classList.remove('process')
						clearTimeout(this.cursor.timeout)
					}
				},
				false
			)
		})
	}

	// handleClick() {
	// 	if (this.currentIntersect) {
	// 		// console.log('look')
	// 		// gsap.to('.information', {
	// 		// 	x: 0,
	// 		// 	duration: 0.5,
	// 		// 	ease: 'expo.easeInOut'
	// 		// })
	// 		gsap.to(this.camera.instance.position, {
	// 			duration: 2,
	// 			x: this.currentIntersect.object.position.x + 3,
	// 			z: this.currentIntersect.object.position.z,
	// 			ease: Power3.easeInOut
	// 		})
	// 	}
	// }

	success() {
		console.log('here')
		console.log(this.experience)

		if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal1'
		) {
			this.experience.switch('firstFloor')
		} else if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal2'
		) {
			this.experience.switch('secondFloor')
		} else if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal3'
		) {
			window.open('https://opensea.io/', '_blank')
		}
	}

	handleClick() {
		// console.log('HANDLE CLICK')
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)

		if (intersects.length > 0) {
			this.currentIntersect = intersects[0]
			this.experience.cursor.enter()

			if (
				this.currentIntersect.object.name === 'portal1' ||
				this.currentIntersect.object.name === 'portal2' ||
				this.currentIntersect.object.name === 'portal3'
			) {
				document.querySelector('.hold').classList.add('active')
			}
		} else {
			document.querySelector('.hold').classList.remove('active')

			this.experience.cursor.leave()
			this.currentIntersect = null
		}
	}
}
