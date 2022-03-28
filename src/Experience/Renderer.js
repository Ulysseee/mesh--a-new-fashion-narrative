import { WebGLRenderer } from 'three'
import Experience from './Experience'

export default class Renderer {
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera

		this.setInstance()
	}

	setInstance() {
		this.instance = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			logarithmicDepthBuffer: true
		})

		this.instance.setClearColor('#211d20')
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}
