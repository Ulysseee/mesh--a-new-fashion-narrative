import { Raycaster as ThreeRaycaster } from 'three'
import Experience from './Experience'

export default class Raycaster {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.cursor = this.experience.cursor.cursorElements[0].DOM.inner

		this.mouse = this.experience.mouse
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
						this.currentIntersect.object.userData.type ===
							'portail' &&
						!this.experience.selectedItem
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

		window.addEventListener('click', () => {
			if (this.currentIntersect && !this.experience.selectedItem) {
				if (
					this.experience.groundFloor ||
					this.experience.secondFloor
				) {
					this.experience.openSound.play()
				}

				if (this.experience.groundFloor) {
					this.experience.groundFloor.handleClick()
				}

				if (this.experience.secondFloor) {
					this.experience.secondFloor.handleClick()
				}
			}
		})
	}

	success() {
		if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal1'
		) {
			this.experience.switch('secondFloor')
		} else if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal2'
		) {
			this.experience.switch('groundFloor')
		} else if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal3'
		) {
			window.open('https://opensea.io/', '_blank')
		}
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mousePos, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)

		if (intersects.length > 0 && !this.experience.isLoading) {
			this.currentIntersect = intersects[0]

			if (!this.experience.selectedItem) {
				this.experience.cursor.enter()
			}

			if (
				(this.currentIntersect.object.name === 'portal1' ||
					this.currentIntersect.object.name === 'portal2' ||
					this.currentIntersect.object.name === 'portal3') &&
				!this.experience.selectedItem
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
