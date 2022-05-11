import { Raycaster as ThreeRaycaster } from 'three'
import Mouse from './utils/Mouse'
import Experience from './Experience'
import gsap, { Power3 } from 'gsap'

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
		if (this.currentIntersect) {
			// console.log('look')
			// gsap.to('.information', {
			// 	x: 0,
			// 	duration: 0.5,
			// 	ease: 'expo.easeInOut'
			// })
			gsap.to(this.camera.instance.position, {
				duration: 2,
				x: this.currentIntersect.object.position.x + 3,
				z: this.currentIntersect.object.position.z,
				ease: Power3.easeInOut
			})
		}
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

	update() {
		this.raycaster.setFromCamera(this.mouse.mouse, this.camera.instance)

		const intersects = this.raycaster.intersectObjects(
			this.experience.items
		)

		if (intersects.length > 0) {
			this.currentIntersect = intersects[0]
			this.experience.cursor.enter()

			// if (
			// 	this.currentIntersect.object.name === 'portal1' ||
			// 	this.currentIntersect.object.name === 'portal2' ||
			// 	this.currentIntersect.object.name === 'portal3'
			// ) {
			// 	this.experience.cursor.enter()
			// }
		} else {
			this.experience.cursor.leave()
			this.currentIntersect = null
		}
	}
}
