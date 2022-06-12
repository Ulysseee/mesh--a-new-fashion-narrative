import { CatmullRomCurve3, Vector3 } from 'three'

const groundFloorPath = new CatmullRomCurve3(
	[
		new Vector3(-3, 0, 10),
		new Vector3(-10, 0, 5),
		new Vector3(-14, 0, -4),
		new Vector3(-12, 0, -10),
		new Vector3(0, 0, -13),
		new Vector3(10, 0, -13),

		new Vector3(20, 0, -13),
		new Vector3(25, -2, -13),
		new Vector3(30, -2, -13),
		new Vector3(33, -3, -13),

		new Vector3(37, -4, -13),
		new Vector3(37, -4, 12),
		new Vector3(33, -3, 13),

		new Vector3(30, -2, 12),

		new Vector3(20, 0, 12),
		new Vector3(10, 0, 12),
		new Vector3(3, 0, 10)
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
