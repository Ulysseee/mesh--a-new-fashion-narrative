import {
	AmbientLight,
	DirectionalLight,
	DirectionalLightHelper,
	AxesHelper,
	sRGBEncoding,
	Mesh,
	MeshStandardMaterial
} from 'three'
import Experience from '../Experience.js'
export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.debug = this.experience.debug
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		this.environmentMap = {}
		this.environmentMap.intensity = 0.9
		this.environmentMap.texture = this.resources.items.environment

		this.setDebug()
		this.setEnvironment()
		this.setEnvironmentMap()
	}

	setDebug() {
		if (this.debug) {
			const axesHelper = new AxesHelper(5)
			this.scene.add(axesHelper)

			const f = this.debug.gui.addFolder({
				title: 'Environment',
				expanded: true
			})

			f.addInput(this.environmentMap, 'intensity', {
				min: 0,
				max: 1,
				step: 0.1
			}).on('change', ({ value }) => {
				this.environmentMap.intensity = value
				this.environmentMap.texture.envMapIntensity = value
			})
		}
	}

	setEnvironment() {
		const ambientLight = new AmbientLight(0xffffff, 0.3)

		const directionalLight = new DirectionalLight(0xffffff, 1)
		directionalLight.position.set(0, 40, 0.866)
		const directionalLightHelper = new DirectionalLightHelper(
			directionalLight,
			0.8 * Math.PI
		)

		this.scene.add(ambientLight, directionalLight, directionalLightHelper)
		// this.scene.add(ambientLight)
	}

	setEnvironmentMap() {
		this.environmentMap.texture.encoding = sRGBEncoding

		this.scene.environment = this.environmentMap.texture

		this.environmentMap.updateMaterials = () => {
			this.scene.traverse((child) => {
				if (
					child instanceof Mesh &&
					child.material instanceof MeshStandardMaterial
				) {
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity =
						this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}
		this.environmentMap.updateMaterials()
	}
}
