import { Pane } from 'tweakpane'

class Debug {
	constructor() {
		this.gui
	}

	initGui() {
		this.gui = new Pane({
			title: 'Settings',
			expanded: true
		})
	}
}

const _instance = new Debug()
export default _instance
