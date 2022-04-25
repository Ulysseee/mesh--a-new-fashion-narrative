import gsap from 'gsap'

export default class Anims {
	constructor() {
		this.infos = document.querySelector('.navigation__controls__infos')

		this.infosBloc = document.querySelector('.informations')
		this.infosClose = document.querySelector('.informationsClose')

		this.animeInfos()
	}

	init() {}

	animeInfos() {
		// this.infos.addEventListener('click', () => {
		// 	gsap.to(this.infosBloc, {
		// 		duration: 1,
		// 		y: 0,
		// 		ease: 'expo'
		// 	})
		// })
		// this.infosClose.addEventListener('click', () => {
		// 	gsap.to(this.infosBloc, {
		// 		duration: 1,
		// 		y: '100%',
		// 		ease: 'expo'
		// 	})
		// })
	}
}
