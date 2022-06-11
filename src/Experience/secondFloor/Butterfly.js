import * as THREE from 'three'
import { FBM } from 'three-noise'

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
		this.offset = Math.random() * 100
		this.mixers = []

		this.setModel()
	}

	setModel() {
		this.group = new THREE.Group()
		for (let i = 0; i < 13; i++) {
			let butterfly
			butterfly = SkeletonUtils.clone(this.resource.scene)
			butterfly.scale.multiplyScalar(3)
			butterfly.position.y = THREE.MathUtils.randFloat(8, 15)
			butterfly.position.x = THREE.MathUtils.randFloat(-5, 5)
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
		this.vec.x = this.time.elapsed / 1000
		this.vec.y = this.time.elapsed / 1000

		this.group.rotation.y -= this.time.delta * 0.001

		// this.group.position.set(0, this.fbm.get2(this.vec) * 10, 0)

		for (let i = 0; i < this.group.children.length; i++) {
			this.group.children[i].position.y = this.fbm.get2(this.vec) * 10
			// this.group.position.set(0, this.fbm.get2(this.vec) * 10, 0)

			this.mixers[i].update(
				this.time.delta * 0.00008 * (Math.random() * 20)
			)
		}
	}
}
