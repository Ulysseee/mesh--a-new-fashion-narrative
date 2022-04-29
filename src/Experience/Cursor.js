import gsap, { Power2 } from 'gsap'

export default class Cursor {
	constructor() {
		this.initCursor()
		this._handleMouseEnter = this.handleMouseEnter.bind(this)
		this._handleMouseLeave = this.handleMouseLeave.bind(this)
	}

	initCursor() {
		this.outerCursor = document.querySelector('.circle-cursor--outer')
		this.innerCursor = document.querySelector('.circle-cursor--inner')
		this.outerCursorBox = this.outerCursor.getBoundingClientRect()
		this.outerCursorSpeed = 0
		this.clientX = -100
		this.clientY = -100
		this.showCursor = false

		document.addEventListener('mousemove', this.unveilCursor.bind(this))
		document.addEventListener('mousemove', (e) => {
			this.clientX = e.clientX
			this.clientY = e.clientY
		})
	}

	unveilCursor() {
		gsap.set(this.innerCursor, {
			x: this.clientX,
			y: this.clientY
		})
		gsap.set(this.outerCursor, {
			x: this.clientX - this.outerCursorBox.width / 2,
			y: this.clientY - this.outerCursorBox.height / 2
		})
		setTimeout(() => {
			this.outerCursorSpeed = 0.002
		}, 1500)
		this.showCursor = true
	}

	update() {
		gsap.set(this.innerCursor, {
			x: this.clientX,
			y: this.clientY
		})

		gsap.to(this.outerCursor, this.outerCursorSpeed, {
			x: this.clientX - this.outerCursorBox.width / 2,
			y: this.clientY - this.outerCursorBox.height / 2
		})

		if (this.showCursor) {
			document.removeEventListener(
				'mousemove',
				this.unveilCursor.bind(this)
			)
		}
	}

	handleMouseEnter() {
		gsap.to(this.outerCursor, 0.2, {
			borderColor: '#ff0000'
		})

		gsap.to(this.innerCursor, 0.9, {
			scale: 10
		})
	}

	handleMouseLeave() {
		gsap.to(this.outerCursor, {
			duration: 0.2,
			borderColor: 'purple'
		})

		gsap.to(this.innerCursor, 0.9, {
			scale: 1
		})
	}
}
