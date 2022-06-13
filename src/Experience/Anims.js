import gsap, { Power2, Power3 } from 'gsap'
import Experience from './Experience'

export default class Anims {
	constructor() {
		this.experience = new Experience()
		this.camera = this.experience.camera
		this.overlay = this.experience.overlay
		this.infos = document.querySelector('.navigation__controls__infos')
		this.scroll = document.querySelector('.helper__scroll')

		this.teleporter = document.querySelector('.teleporter')
		this.groundFloor = document.querySelector('.groundFloor')
		this.firstFloor = document.querySelector('.firstFloor')
	}

	showInfoModal(cloth) {
		this.showTimeline = gsap
			.timeline()
			.to('.information', {
				css: { zIndex: 99 }
			})
			.to('.information__wrapper', {
				opacity: 1
			})
			.to('.information__overlay__path', {
				duration: 0.4,
				ease: Power2.easeIn,
				delay: -0.3,
				attr: { d: 'M 100 0 L 100 100 L 60 100 Q 0 50 60 0 Z' }
			})
			.to('.information__overlay__path', {
				duration: 0.8,
				delay: -0.01,
				ease: Power3.easeOut,
				attr: { d: 'M 100 0 L 100 100 L 0 100 Q 0 49 0 0 Z' }
			})
			.to('.information__close', {
				opacity: 1,
				duration: 0.4,
				delay: -0.4,
				ease: Power3.easeIn
			})
			.to(`${cloth} .cloth__title .char`, {
				opacity: 1,
				y: 0,
				rotate: 0,
				duration: 0.8,
				stagger: {
					each: 0.04,
					from: 'start'
				},
				delay: -0.7,
				ease: Power3.easeInOut
			})
		document.querySelectorAll(`${cloth} .cloth__subtitle`).forEach((el) => {
			this.showTimeline.to(el.querySelectorAll('.word'), {
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: {
					each: 0.04,
					from: 'start'
				},
				delay: -0.85,
				ease: Power3.easeInOut
			})
		})
		document
			.querySelectorAll(`${cloth} .cloth__paragraph`)
			.forEach((el) => {
				this.showTimeline.to(el.querySelectorAll('.word'), {
					opacity: 1,
					duration: 0.4,
					stagger: 0.015,
					delay: -1.8,
					ease: Power3.easeIn
				})
			})
	}

	hideInfoModal() {
		this.hideTimeline = gsap
			.timeline({
				onComplete: () => {
					this.showTimeline.progress(0).kill()
					document
						.querySelectorAll('.cloth')
						.forEach((cloth) => cloth.classList.remove('active'))
				}
			})
			.to('.information__wrapper', {
				opacity: 0,
				duration: 0.9,
				ease: Power3.easeIn
			})
			.to('.information__overlay__path', {
				duration: 0.6,
				ease: Power3.easeIn,
				attr: { d: 'M 100 0 L 100 100 L 1 100 Q 60 50 1 0 Z' }
			})
			.to('.information__overlay__path', {
				duration: 0.8,
				ease: Power2.easeOut,
				delay: -0.01,
				attr: { d: 'M 100 0 L 100 100 L 100 100 Q 100 50 100 0 Z' }
			})
			.to('.information', {
				css: { zIndex: -1 }
			})
	}

	showScrollHelper() {
		const parahraph = this.scroll.querySelectorAll('p > .word')
		gsap.timeline()
			.to(this.scroll, {
				duration: 0.5,
				ease: Power3.easeIn,
				// scaleX: 1,
				opacity: 1
			})
			.to(parahraph, {
				opacity: 1,
				stagger: 0.075,
				ease: Power2.easeIn
				// delay: 1
			})
	}

	hideScrollHelper() {
		const parahraph = this.scroll.querySelectorAll('p > .word')
		gsap.timeline()
			.to(parahraph, {
				stagger: 0.047,
				ease: Power2.easeIn,
				opacity: 0,
				delay: -0.2
			})
			.to(this.scroll, {
				duration: 0.5,
				ease: Power3.easeIn,
				delay: -0.38,
				opacity: 0
			})
	}

	async switchIn(level) {
		const header = document.querySelector('.header')
		const timeline = document.querySelector('.timeline__wrapper')
		let floor = document.querySelector(`.${level}`)
		let flootIntro = document.querySelectorAll(`.${level}__intro > .word`)

		this.switchInTl = gsap.timeline()

		await this.switchInTl
			.to(this.overlay.material.uniforms.uAlpha, {
				duration: 2,
				value: 1,
				ease: Power3.easeIn
			})
			.to(header, {
				duration: 1,
				delay: -1,
				opacity: 0
			})
			.to(timeline, {
				duration: 1,
				delay: -1,
				opacity: 0
			})
			.to(this.camera.instance.position, {
				duration: 3,
				delay: -3,
				z: -14,
				ease: Power3.easeIn
			})
			.to(this.teleporter, {
				css: { zIndex: 99 }
			})
			.to(floor, {
				opacity: 1,
				delay: -1,
				ease: Power3.easeIn
			})
			.to(flootIntro, {
				opacity: 1,
				duration: 0.7,
				stagger: {
					each: 0.03,
					from: 'start'
				},
				// delay: -0.7,
				ease: Power3.easeInOut
			})
	}
	async switchOut(level) {
		const header = document.querySelector('.header')
		const timeline = document.querySelector('.timeline__wrapper')
		let floor = document.querySelector(`.${level}`)
		let flootIntro = document.querySelectorAll(`.${level}__intro > .word`)

		this.switchOutTl = gsap.timeline({
			onComplete: () => {
				this.experience.isLoading = false
			}
		})

		if (level === 'secondFloor') {
			await this.switchOutTl
				.to(flootIntro, {
					opacity: 0,
					duration: 0.4,
					stagger: {
						each: 0.03,
						from: 'start'
					},
					// delay: -0.7,
					ease: Power3.easeInOut
				})
				.to(floor, {
					opacity: 0,
					ease: Power3.easeOut
				})
				.to(this.teleporter, {
					css: { zIndex: -1 }
				})
				.to(this.overlay.material.uniforms.uAlpha, {
					duration: 1,
					value: 0,
					ease: Power3.easeOut
				})
				.to(this.camera.instance.position, {
					duration: 2,
					delay: -1,
					z: 10
				})
				.to(header, {
					duration: 1,
					opacity: 1
				})
		} else {
			await this.switchOutTl
				.to(flootIntro, {
					opacity: 0,
					duration: 0.4,
					stagger: {
						each: 0.03,
						from: 'start'
					},
					// delay: -0.7,
					ease: Power3.easeIn
				})
				.to(floor, {
					opacity: 0,
					ease: Power3.easeIn
				})
				.to(this.teleporter, {
					css: { zIndex: -1 }
				})
				.to(this.overlay.material.uniforms.uAlpha, {
					duration: 1,
					value: 0,
					ease: Power3.easeInOut
				})
				.to(this.experience.camera.instance.position, {
					duration: 2,
					delay: -1.25,
					z: 0
				})
				.to(header, {
					duration: 1,
					opacity: 1
				})
				.to(timeline, {
					duration: 1,
					opacity: 1,
					delay: -1
				})
		}
	}
	reviewModel(camera, model) {
		const timeline = gsap.timeline({
			onComplete: () => {
				this.experience.parallax.active = true
			}
		})

		timeline.to(camera.position, {
			duration: 1.75,
			x: model.position.x,
			y: model.position.y,
			z: model.position.z - 3,
			ease: Power3.easeOut
		})
	}

	leaveModel(camera, model) {
		const timeline = gsap.timeline({
			onComplete: () => {
				this.experience.parallax.active = true
			}
		})

		timeline.to(camera.position, {
			duration: 1.75,
			x: model.position.x,
			y: model.position.y,
			z: model.position.z - 3,
			ease: Power3.easeOut
		})
	}
}
