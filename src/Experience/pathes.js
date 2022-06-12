import { CatmullRomCurve3, Vector3 } from 'three'

const groundFloorPath = new CatmullRomCurve3(
	[
		new Vector3(5, 0, 0),
		new Vector3(6, 0, 11),

		new Vector3(20, 0, 11),
		new Vector3(30, -2, 11),
		new Vector3(33, -3, 11),
		new Vector3(35, -4, 9),
		new Vector3(35, -4, -9),
		new Vector3(33, -3, -11),
		new Vector3(30, -2, -11),
		new Vector3(25, -2, -11),
		new Vector3(20, 0, -11),
		new Vector3(10, 0, -11),
		new Vector3(0, 0, 11),
		new Vector3(-10, 0, 5),
		new Vector3(-8, 0, -4),
		new Vector3(-8, 0, -11),
		new Vector3(0, 0, -11),
		new Vector3(5, 0, -11)
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
