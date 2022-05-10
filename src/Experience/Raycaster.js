import { Raycaster as ThreeRaycaster } from 'three'
import Mouse from './utils/Mouse'
import Experience from './Experience'

export default class Raycaster {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		this.mouse = new Mouse()
		this.onPortal = null
		this.currentIntersect = null
		this.raycaster = new ThreeRaycaster()

		window.addEventListener('click', () => {
			this.handleClick()
		})
	}

	handleClick() {
		if (
			this.experience.raycaster.currentIntersect &&
			this.experience.raycaster.currentIntersect.object.name === 'portal1'
		) {
			this.experience.switch('firstFloor')
		} else if (
			this.experience.raycaster.currentIntersect &&
			this.experience.raycaster.currentIntersect.object.name === 'portal2'
		) {
			this.experience.switch('secondFloor')
		} else if (
			this.experience.raycaster.currentIntersect &&
			this.experience.raycaster.currentIntersect.object.name === 'portal3'
		) {
			window.open(
				'https://play.google.com/store/apps/details?id=com.drishya',
				'_blank',
				'location=yes,height=570,width=520,scrollbars=yes,status=yes'
			)
		}
	}

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)

		if (intersects.length > 0) {
			this.currentIntersect = intersects[0]

			if (
				this.currentIntersect.object.name === 'portal1' ||
				this.currentIntersect.object.name === 'portal2' ||
				this.currentIntersect.object.name === 'portal3'
			) {
				this.experience.cursor.enter()
			}
		} else {
			this.experience.cursor.leave()
			this.currentIntersect = null
		}
	}
}
