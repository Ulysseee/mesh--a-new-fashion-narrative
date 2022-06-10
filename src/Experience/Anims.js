import gsap, { Power2, Power3 } from 'gsap'

export default class Anims {
	constructor() {
		this.infos = document.querySelector('.navigation__controls__infos')
		this.overlayPath = document.querySelector('.overlay__path')
		this.infosBloc = document.querySelector('.informations')
		this.infosClose = document.querySelector('.informationsClose')
		this.scroll = document.querySelector('.helper__scroll')
		this.clothSubtitle = document.querySelectorAll('.cloth__subtitle')
		this.clothParagraph = document.querySelectorAll('.cloth__paragraph')
	}

	infoModal() {
		// gsap.timeline()
		// 	.to(this.title, {
		// 		duration: 0.7,
		// 		ease: 'power3.in',
		// 		y: '-100%',
		// 		stagger: 0.05
		// 	})

		// 	.to(
		// 		this.overlayPath,
		// 		{
		// 			duration: 0.7,
		// 			ease: 'power2.in',
		// 			attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
		// 		},
		// 		'-=0.5'
		// 	)
		// 	.to(this.overlayPath, {
		// 		duration: 1.1,
		// 		ease: 'power4',
		// 		attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
		// 	})

		let timeline = gsap.timeline()
		timeline
			.to('.information', {
				css: { zIndex: 99 }
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
			.to('.cloth__title .char', {
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
		this.clothSubtitle.forEach((el) => {
			timeline.to(el.querySelectorAll('.word'), {
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
		this.clothParagraph.forEach((el) => {
			timeline.to(el.querySelectorAll('.word'), {
				opacity: 1,
				duration: 0.4,
				stagger: 0.015,
				delay: -1.8,
				ease: Power3.easeIn
			})
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
				stagger: 0,
				ease: Power2.easeIn,
				opacity: 0,
				delay: -0.2
			})
			.to(this.scroll, {
				duration: 0.5,
				ease: Power3.easeIn,
				delay: -0.4,
				opacity: 0
			})
		// .to(this.scroll, {
		// 	scaleX: 0
		// })
	}
}
