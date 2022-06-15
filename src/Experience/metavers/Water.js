import { PlaneGeometry, Vector3, RepeatWrapping, TextureLoader } from 'three'
import { Water } from 'three/examples/jsm/objects/Water.js'

import Experience from '../Experience'

export default class WaterClass {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.resources = this.experience.resources
		this.time = this.experience.time

		this.setWater()

		if (this.debug) this.setDebug()
	}

	setWater() {
		const waterGeometry = new PlaneGeometry(150, 150)

		this.water = new Water(waterGeometry, {
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new TextureLoader().load(
				'textures/waternormals.jpg',
				function (texture) {
					return (texture.wrapS = texture.wrapT = RepeatWrapping)
				}
			),
			sunDirection: new Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7
		})

		this.water.rotation.x = -Math.PI / 2
		this.water.position.y = -1

		this.scene.add(this.water)
	}

	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'Water',
			expanded: true
		})

		f.addInput(this.water.material.uniforms.distortionScale, 'value', {
			min: 0,
			max: 8,
			step: 0.1
		})

		f.addInput(this.water.material.uniforms.size, 'value', {
			min: 0.1,
			max: 10,
			step: 0.1
		})
	}

	update() {
		this.water.material.uniforms['time'].value = this.time.elapsed * 0.0004
	}
}
