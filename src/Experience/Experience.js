import * as THREE from 'three'
import Debug from '@utils/Debug.js'
import Sizes from '@utils/Sizes.js'
import Time from '@utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import SecondFloor from './secondFloor/World.js'
import World from './World/World.js'
import Resources from '@utils/Resources.js'

import gsap from 'gsap'

import { rdc, first } from './sources.js'
import config from '@utils/config'

export default class Experience {
	constructor(_canvas) {
		if (Experience._instance) {
			return Experience._instance
		}

		Experience._instance = this

		// Options
		this.canvas = _canvas
		this.items = []

		// Setup
		this.sizes = new Sizes()
		this.time = new Time()
		this.scene = new THREE.Scene()

		this.resources = new Resources(first)
		this.camera = new Camera()
		this.renderer = new Renderer()
		// this.world = new World()
		this.secondFloor = new SecondFloor()
		this.setDebug()

		// Resize event
		this.sizes.on('resize', () => {
			this.resize()
		})

		window.addEventListener('keydown', (e) => {
			this.logKey(e)
		})

		this.overlayGeometry = new THREE.PlaneGeometry(10, 10, 5, 5)
		this.overlayMaterial = new THREE.ShaderMaterial({
			transparent: true,
			uniforms: {
				uAlpha: { value: 0 }
			},
			vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
			fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
        }
    `
		})

		this.overlayMaterial.needsUpdate = true
		this.overlay = new THREE.Mesh(
			this.overlayGeometry,
			this.overlayMaterial
		)
		this.overlay.name = 'loader'
		this.scene.add(this.overlay)

		// Time tick event
		this.update()
	}

	setDebug() {
		if (config.gui) {
			this.debug = new Debug()

			const f = this.debug.gui.addFolder({
				title: 'config',
				expanded: true
			})

			f.addInput(config, 'controls').on('change', () => {
				this.camera.controls.enabled = !this.camera.controls.enabled
			})
		}
	}

	update() {
		this.camera.update()

		if (this.world) this.world.update()
		if (this.secondFloor) this.secondFloor.update()

		if (this.renderer) this.renderer.update()

		if (this.debug) this.debug.stats.update()

		window.requestAnimationFrame(() => {
			this.update()
		})
	}

	resize() {
		this.camera.resize()
		this.renderer.resize()
	}

	logKey(e) {
		if (`${e.code}` === 'Space') {
			this.destroy()
		}
	}

	destroy() {
		const loadingBarElement = document.querySelector('.loading-bar')
		const loadingBarContainer = document.querySelector('.loading-container')

		loadingBarContainer.style.opacity = 1

		// Traverse the whole scene
		gsap.to(this.overlayMaterial.uniforms.uAlpha, {
			duration: 1,
			value: 1,
			delay: 0
		})

		for (let i = this.scene.children.length - 1; i >= 0; i--) {
			let child = this.scene.children[i]
			if (child.name !== 'loader') {
				this.scene.remove(child)
			}
		}

		this.resources = new Resources(rdc)

		this.resources.on('progress', (percent) => {
			loadingBarElement.style.maxWidth = `${percent * 100}%`
			loadingBarElement.style.width = `${percent * 100}%`
		})

		this.world = new World()

		this.resources.on('ready', () => {
			setTimeout(() => {
				gsap.to(this.overlayMaterial.uniforms.uAlpha, {
					duration: 1,
					value: 0,
					delay: 1
				})
				loadingBarContainer.style.opacity = 0
			}, 1000)
			// Setup
		})

		loadingBarElement.style.maxWidth = '0%'
		loadingBarElement.style.width = '0%'
	}
}
