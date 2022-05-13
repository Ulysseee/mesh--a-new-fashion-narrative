export default class Cloth {
	constructor() {}

	displayInfo(el) {
		document.querySelector('.information').classList.toggle('active')
		document.querySelector(el).classList.add('active')
	}
}
