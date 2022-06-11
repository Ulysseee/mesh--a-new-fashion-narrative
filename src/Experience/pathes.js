import { CatmullRomCurve3, Vector3 } from 'three'

const groundFloorPath = new CatmullRomCurve3(
	[
		new Vector3(-3, 0, -10),
		new Vector3(-10, 0, -25),
		new Vector3(-14, 0, -34),
		new Vector3(-12, 0, -40),
		new Vector3(0, 0, -47),
		new Vector3(12, 0, -40),
		new Vector3(14, 0, -34),
		new Vector3(10, 0, -25),
		new Vector3(3, 0, -10)
	],
	true
)

const secondFloorPath = new CatmullRomCurve3(
	[
		new Vector3(0, 3, 10),
		// new Vector3(0, 0, 0),
		new Vector3(-3, 3, -10),
		new Vector3(-10, 3, -25),
		new Vector3(-14, 3, -34),
		new Vector3(-12, 3, -40),
		new Vector3(0, 3, -47),
		new Vector3(12, 3, -40),
		new Vector3(14, 3, -34),
		new Vector3(10, 3, -25),
		new Vector3(3, 3, -10)
	],
	true
)

export { groundFloorPath, secondFloorPath }
