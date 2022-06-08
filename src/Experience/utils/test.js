import Experience from '../Experience'

export default class Test {
	constructor() {
		this.canvas = document.querySelector('#canvasPreview')
		this.ctx = canvas.getContext('2d')
		this.img = new Image()

		this.table = []

		this.inputImage = document.getElementById('readUrl')
		this.inputDownload = document.getElementById('submit')
		this.inputTest = document.getElementById('test')

		this.canvasTest = document.querySelector('#canvasTest')
		this.ctxTest = this.canvasTest.getContext('2d')

		this.inputImage.addEventListener('change', this.handleImageAdd)
		this.inputDownload.addEventListener('click', this.handleDownload)
		this.inputTest.addEventListener('click', this.testData)
		this.img.addEventListener(
			'load',
			function () {
				ctx.canvas.width = img.width
				ctx.canvas.height = img.height
				ctx.drawImage(img, 0, 0)
				window.URL.revokeObjectURL(this.src)
			},
			false
		)
	}

	handleImageAdd() {
		if (this.files[0]) {
			img.src = window.URL.createObjectURL(this.files[0])
			inputDownload.style.display = 'block'
		} else {
			inputDownload.style.display = 'none'
		}
	}

	download(filename, textInput) {
		var element = document.createElement('a')
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8, ' + encodeURIComponent(textInput)
		)
		element.setAttribute('download', filename)
		document.body.appendChild(element)
		element.click()
		//document.body.removeChild(element);
	}

	handleDownload() {
		for (let i = 0; i < img.height; i++) {
			for (let j = 0; j < img.width; j++) {
				var pixel = ctx.getImageData(j, i, 1, 1)
				var data = pixel.data
				table.push({
					x: j,
					y: i,
					r: data[0],
					g: data[1],
					b: data[2],
					a: data[3]
				})
			}
		}
		inputTest.style.display = 'block'

		const text = JSON.stringify(table)
		var filename = 'rgba.json'
		download(filename, text)

		// console.log(table);
	}

	testData() {
		ctxTest.canvas.width = img.width
		ctxTest.canvas.height = img.height
		let imageData = ctxTest.createImageData(img.width, img.height)
		let pixels = imageData.data

		let numPixels = imageData.width * imageData.height
		for (let i = 0; i < numPixels; i++) {
			pixels[i * 4] = table[i].r // Red
			pixels[i * 4 + 1] = table[i].g // Green
			pixels[i * 4 + 2] = table[i].b // Blue
			pixels[i * 4 + 3] = table[i].a // Alpha
		}

		ctxTest.putImageData(imageData, 0, 0)
	}
}
