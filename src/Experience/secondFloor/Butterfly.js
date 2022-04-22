import * as THREE from 'three'
import { MathUtils } from 'three'
import { FBM, Perlin } from 'three-noise'

import Experience from '../Experience.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

export default class Butterfly {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.resource = this.resources.items.butterfly
		this.butterfly = SkeletonUtils.clone(this.resource.scene)
		this.vec = new THREE.Vector2()
		this.fbm = new FBM({ seed: Math.random() })
		this.perlin = new Perlin(Math.random())
		this.offset = Math.random() * 100
		this.mixers = []

		this.setModel()
	}

	setModel() {
		this.group = new THREE.Group()
		for (let i = 0; i < 15; i++) {
			let butterfly
			butterfly = SkeletonUtils.clone(this.resource.scene)
			butterfly.scale.multiplyScalar(3)
			butterfly.position.y = MathUtils.randFloat(10, 15)
			butterfly.position.x = MathUtils.randFloat(-10, 10)
			butterfly.rotation.y = this.offset

			butterfly.rotation.y = Math.PI / 4

			//Playing Animation
			let mixer = new THREE.AnimationMixer(butterfly)
			mixer
				.clipAction(this.resource.animations[0])
				.setEffectiveTimeScale(6)
				.play()

			this.mixers.push(mixer)
			this.group.add(butterfly)
		}

		this.scene.add(this.group)
	}

	update() {
		this.vec.set(this.time.elapsed, this.time.elapsed)
		this.group.rotation.y -= this.time.delta * 0.001

		this.group.position.set(0, this.perlin.get2(this.vec), 0)

		for (let i = 0; i < this.group.children.length; i++) {
			this.mixers[i].update(this.time.delta * 0.0018 * Math.random())
		}
	}
}
