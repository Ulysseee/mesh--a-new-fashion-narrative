import Experience from '../Experience.js'

import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js'
import { ReflectorForSSRPass } from 'three/examples/jsm/objects/ReflectorForSSRPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { MeshStandardMaterial } from 'three'

export default class Building {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.rdcModel
		this.setModel()

		// this.setPostproccess()
	}

	setModel() {
		this.resource.scene.scale.set(2, 2, 2)
		this.resource.scene.position.set(0, 0, 0)
		this.scene.add(this.resource.scene)
	}

	setPostproccess() {
		this.groundReflector = new ReflectorForSSRPass(
			this.resource.scene.children[0].children[0].children[0].children[6].children[0].geometry,
			{
				clipBias: 0.0003,
				// textureWidth: this.experience.sizes.width,
				// textureHeight: this.experience.sizes.height,
				color: 0x888888,
				useDepthTexture: true
			}
		)
		this.groundReflector.material.depthWrite = false
		// this.groundReflector.rotation.x = - Math.PI / 2;
		this.groundReflector.visible = false
		this.scene.add(this.groundReflector)

		this.ssrPass = new SSRPass({
			renderer: this.experience.renderer.instance,
			scene: this.experience.scene,
			camera: this.experience.camera.instance,
			// width: this.experience.sizes.width,
			// height: this.experience.sizes.height,
			groundReflector: this.groundReflector,
			selects:
				this.resource.scene.children[0].children[0].children[0]
					.children[6].children[0]
		})
		// this.experience.renderer.effectComposer.addPass(this.ssrPass)
		// this.experience.renderer.effectComposer.addPass(
		// 	new ShaderPass(GammaCorrectionShader)
		// )
	}
}
