import { Raycaster as ThreeRaycaster } from 'three'
import Experience from './Experience'

export default class Raycaster {
	constructor() {
		this.experience = new Experience()
		this.stamps = this.experience.stamps
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.cursor = this.experience.cursor.cursorElements[1].DOM.inner
		this.star = this.experience.cursor.cursorElements[0].DOM.el

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
				if (this.experience.gallery || this.experience.metavers) {
					this.experience.openSound.play()
				}

				if (this.experience.gallery) {
					this.experience.gallery.handleClick()
				}

				if (this.experience.metavers) {
					this.experience.metavers.handleClick()
				}
			}
		})
	}

	success() {
		if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal1'
		) {
			this.experience.switch('metavers')
		} else if (
			this.currentIntersect &&
			this.currentIntersect.object.name === 'portal2'
		) {
			this.experience.switch('gallery')
		}
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mousePos, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)

		if (this.experience.metavers) {
			for (const point of this.stamps.points) {
				// Get 2D screen position
				const screenPosition = point.position.clone()
				screenPosition.project(this.camera.instance)

				// if (intersects.length === 0) {
				point.element.classList.add('visible')
				// } else {
				// 	// Get the distance of the intersection and the distance of the point
				// 	const intersectionDistance = intersects[0].distance
				// 	const pointDistance = point.position.distanceTo(
				// 		this.camera.instance.position
				// 	)

				// 	// Intersection is close than the point
				// 	if (intersectionDistance < pointDistance) {
				// 		point.element.classList.remove('visible')
				// 	} else {
				// 		// Intersection is further than the point
				// 		point.element.classList.add('visible')
				// 	}
				// }

				const translateX = screenPosition.x * this.sizes.width * 0.5
				const translateY = -screenPosition.y * this.sizes.height * 0.5
				point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
			}
		}

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
				this.star.classList.add('hide')
			}
		} else {
			document.querySelector('.hold').classList.remove('active')
			this.star.classList.remove('hide')

			this.experience.cursor.leave()
			this.currentIntersect = null
		}
	}
}
