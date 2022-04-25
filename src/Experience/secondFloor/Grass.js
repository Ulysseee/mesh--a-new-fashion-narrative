import {
	Color,
	Mesh,
	Group,
	Vector3,
	Vector4,
	TextureLoader,
	PlaneGeometry,
	PlaneBufferGeometry,
	InstancedBufferGeometry,
	InstancedBufferAttribute,
	MeshStandardMaterial,
	ShaderMaterial,
	DoubleSide
} from 'three'
import SimplexNoise from 'simplex-noise'
import { Geometry } from 'three/examples/jsm/deprecated/Geometry'

import Experience from '../Experience'

import grassFrag from '@shaders/grass/newGrass.frag'
import grassVert from '@shaders/grass/newGrass.vert'

import bladeDiffuse from '/assets/blade_diffuse.jpg'
import bladeAlpha from '/assets/blade_alpha.jpg'

const simplex = new SimplexNoise(Math.random)

export default class Grass {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.group = new Group()

		this.t = 0
		this.params = {
			instanceNumber: 100000
		}

		this.setGrass()

		if (this.debug) this.setDebug()
	}

	setGrass() {
		const textureLoader = new TextureLoader()
		const texture = textureLoader.load(bladeDiffuse)
		const alphaMap = textureLoader.load(bladeAlpha)
		const attributeData = this.getAttributeData(50000, 150)
		const bladeGeom = new PlaneBufferGeometry(0.12, 1, 1, 5).translate(
			0,
			1 / 2,
			0
		)

		this.grassGeometry = new InstancedBufferGeometry()
		this.grassGeometry.index = bladeGeom.index
		this.grassGeometry.attributes.position = bladeGeom.attributes.position
		this.grassGeometry.attributes.uv = bladeGeom.attributes.uv

		const offset = new InstancedBufferAttribute(
			new Float32Array(attributeData.offsets),
			3
		)
		const orientations = new InstancedBufferAttribute(
			new Float32Array(attributeData.orientations),
			4
		)
		const stretch = new InstancedBufferAttribute(
			new Float32Array(attributeData.stretches),
			1
		)
		const halfRootAngleSin = new InstancedBufferAttribute(
			new Float32Array(attributeData.halfRootAngleSin),
			1
		)
		const halfRootAngleCos = new InstancedBufferAttribute(
			new Float32Array(attributeData.halfRootAngleCos),
			1
		)

		this.grassGeometry.setAttribute('offset', offset)
		this.grassGeometry.setAttribute('orientation', orientations)
		this.grassGeometry.setAttribute('stretch', stretch)
		this.grassGeometry.setAttribute('halfRootAngleSin', halfRootAngleSin)
		this.grassGeometry.setAttribute('halfRootAngleCos', halfRootAngleCos)

		this.grassMaterial = new ShaderMaterial({
			uniforms: {
				bladeHeight: { value: 1 },
				map: { value: texture },
				alphaMap: { value: alphaMap },
				time: { value: 0 },
				tipColor: {
					value: new Color(0.0, 0.6, 0.0).convertSRGBToLinear()
				},
				bottomColor: {
					value: new Color(0.0, 0.1, 0.0).convertSRGBToLinear()
				}
			},
			vertexShader: grassVert,
			fragmentShader: grassFrag,
			side: DoubleSide
		})

		this.grass = new Mesh(this.grassGeometry, this.grassMaterial)
		this.scene.add(this.grass)

		const groundGeometry = new Geometry().fromBufferGeometry(
			new PlaneGeometry(150, 150, 32, 32)
		)
		groundGeometry.verticesNeedUpdate = true
		groundGeometry.lookAt(new Vector3(0, 1, 0))
		for (let i = 0; i < groundGeometry.vertices.length; i++) {
			const v = groundGeometry.vertices[i]
			v.y = this.getYPosition(v.x, v.z)
		}
		groundGeometry.computeVertexNormals()
		const groundMaterial = new MeshStandardMaterial({ color: 0x000f00 })
		this.ground = new Mesh(
			groundGeometry.toBufferGeometry(),
			groundMaterial
		)
		this.ground.position.set(0, 0, 0)

		this.group.add(this.ground)
		this.group.add(this.grass)

		this.scene.add(this.group)
	}

	setDebug() {
		const f = this.debug.gui.addFolder({
			title: 'Grass',
			expanded: true
		})

		f.addInput(this.params, 'instanceNumber', {
			min: 1000,
			max: 20000,
			step: 100
		})
	}

	update() {
		this.t += 0.005

		this.grassMaterial.uniforms.time.value = this.t
		this.grassMaterial.uniformsNeedUpdate = true
	}

	getAttributeData(instances, width) {
		const offsets = []
		const orientations = []
		const stretches = []
		const halfRootAngleSin = []
		const halfRootAngleCos = []

		let quaternion_0 = new Vector4()
		let quaternion_1 = new Vector4()

		//The min and max angle for the growth direction (in radians)
		const min = -0.25
		const max = 0.25

		//For each instance of the grass blade
		for (let i = 0; i < instances; i++) {
			//Offset of the roots
			const offsetX = Math.random() * width - width / 2
			const offsetZ = Math.random() * width - width / 2
			const offsetY = this.getYPosition(offsetX, offsetZ)
			// const offsetY = 0
			offsets.push(offsetX, offsetY, offsetZ)

			//Define random growth directions
			//Rotate around Y
			let angle = Math.PI - Math.random() * (2 * Math.PI)
			halfRootAngleSin.push(Math.sin(0.5 * angle))
			halfRootAngleCos.push(Math.cos(0.5 * angle))

			let RotationAxis = new Vector3(0, 1, 0)
			let x = RotationAxis.x * Math.sin(angle / 2.0)
			let y = RotationAxis.y * Math.sin(angle / 2.0)
			let z = RotationAxis.z * Math.sin(angle / 2.0)
			let w = Math.cos(angle / 2.0)
			quaternion_0.set(x, y, z, w).normalize()

			//Rotate around X
			angle = Math.random() * (max - min) + min
			RotationAxis = new Vector3(1, 0, 0)
			x = RotationAxis.x * Math.sin(angle / 2.0)
			y = RotationAxis.y * Math.sin(angle / 2.0)
			z = RotationAxis.z * Math.sin(angle / 2.0)
			w = Math.cos(angle / 2.0)
			quaternion_1.set(x, y, z, w).normalize()

			//Combine rotations to a single quaternion
			quaternion_0 = this.multiplyQuaternions(quaternion_0, quaternion_1)

			//Rotate around Z
			angle = Math.random() * (max - min) + min
			RotationAxis = new Vector3(0, 0, 1)
			x = RotationAxis.x * Math.sin(angle / 2.0)
			y = RotationAxis.y * Math.sin(angle / 2.0)
			z = RotationAxis.z * Math.sin(angle / 2.0)
			w = Math.cos(angle / 2.0)
			quaternion_1.set(x, y, z, w).normalize()

			//Combine rotations to a single quaternion
			quaternion_0 = this.multiplyQuaternions(quaternion_0, quaternion_1)

			orientations.push(
				quaternion_0.x,
				quaternion_0.y,
				quaternion_0.z,
				quaternion_0.w
			)

			//Define variety in height
			if (i < instances / 3) {
				stretches.push(Math.random() * 1.8)
			} else {
				stretches.push(Math.random())
			}
		}

		return {
			offsets,
			orientations,
			stretches,
			halfRootAngleCos,
			halfRootAngleSin
		}
	}

	multiplyQuaternions(q1, q2) {
		const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x
		const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y
		const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z
		const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
		return new Vector4(x, y, z, w)
	}

	getYPosition(x, z) {
		var y = 2 * simplex.noise2D(x / 50, z / 50)
		y += 1 * simplex.noise2D(x / 100, z / 100)
		y += 0.2 * simplex.noise2D(x / 10, z / 10)
		return y
	}
}
