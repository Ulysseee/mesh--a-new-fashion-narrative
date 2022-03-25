import { Pane } from 'tweakpane'

import StatsJs from '@utils/Stats'
class Debug {
	constructor() {
		this.gui

		this.stats = new StatsJs()
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
