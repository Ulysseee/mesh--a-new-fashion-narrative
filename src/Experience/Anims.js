import gsap from 'gsap'

export default class Anims {
	constructor() {
		this.infos = document.querySelector('.navigation__controls__infos')
		this.overlayPath = document.querySelector('.overlay__path')
		this.infosBloc = document.querySelector('.informations')
		this.infosClose = document.querySelector('.informationsClose')
		this.scroll = document.querySelector('.helper__scroll')
	}

	infoModal() {
		gsap.timeline()

			.to(this.title, {
				duration: 0.7,
				ease: 'power3.in',
				y: '-100%',
				stagger: 0.05
			})

			.to(
				this.overlayPath,
				{
					duration: 0.7,
					ease: 'power2.in',
					attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
				},
				'-=0.5'
			)
			.to(this.overlayPath, {
				duration: 1.1,
				ease: 'power4',
				attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
			})
	}

	showScrollHelper() {
		gsap.to(this.scroll, {
			duration: 0.5,
			ease: 'power2.in',
			opacity: 1
		})
	}

	hideScrollHelper() {
		gsap.to(this.scroll, {
			duration: 0.5,
			ease: 'power2.in',
			opacity: 0
		})
	}
}
