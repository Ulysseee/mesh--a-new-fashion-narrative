import { Vector2 } from 'three'

export default class Mouse {
	constructor() {
		this.bind()
		this.mouse = new Vector2()
	}

	getMousePos(event) {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
	}

	bind() {
		this.getMousePos = this.getMousePos.bind(this)
	}
}
