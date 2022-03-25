import * as Stats from 'stats.js'

export default class StatsJs {
	constructor() {
		this.stats = new Stats()
		this.stats.showPanel(0)

		this.active = false

		this.activate()
	}

	activate() {
		this.active = true

		document.body.appendChild(this.stats.dom)
	}

	desactivate() {
		this.active = false

		this.stats.dom.remove()
	}

	update() {
		if (!this.active) return

		this.stats.update()
	}
}
