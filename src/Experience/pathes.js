import { CatmullRomCurve3, Vector3 } from 'three'

const goundFloorPath = new CatmullRomCurve3([
	new Vector3(0, 0, 10),
	// new Vector3(0, 0, 0),
	new Vector3(-3, 0, -10),
	new Vector3(-10, 0, -25),
	new Vector3(-14, 0, -34),
	new Vector3(-12, 0, -40),
	new Vector3(0, 0, -47),
	new Vector3(12, 0, -40),
	new Vector3(14, 0, -34),
	new Vector3(10, 0, -25),
	new Vector3(3, 0, -10)
])

const firstFloorPath = new CatmullRomCurve3([
	new Vector3(-19, 2, 2),
	new Vector3(-8, 2, 0),
	new Vector3(10, 2, 0)
	// new Vector3(11, 7, 24),
	// new Vector3(2, 7, 36),
	// new Vector3(-14, 5, 26),
	// new Vector3(-21, 7, 38)

	// new Vector3(0, 0, 10),
	// // new Vector3(0, 0, 0),
	// new Vector3(-3, 0, -10),
	// new Vector3(-10, 0, -25),
	// new Vector3(-14, 0, -34),
	// new Vector3(-12, 0, -40),
	// new Vector3(0, 0, -47),
	// new Vector3(12, 0, -40),
	// new Vector3(14, 0, -34),
	// new Vector3(10, 0, -25),
	// new Vector3(3, 0, -10)
])

const test = [
	[-19, 2, 0],
	[-8, 0, 0],
	[10, 0, 0],
	[11, 24, 5],
	[2, 36, 5],
	[-14, 26, 3],
	[-21, 38, 5]
]

const secondFloorPath = new CatmullRomCurve3([
	new Vector3(0, 0, 10),
	// new Vector3(0, 0, 0),
	new Vector3(-3, 0, -10),
	new Vector3(-10, 0, -25),
	new Vector3(-14, 0, -34),
	new Vector3(-12, 0, -40),
	new Vector3(0, 0, -47),
	new Vector3(12, 0, -40),
	new Vector3(14, 0, -34),
	new Vector3(10, 0, -25),
	new Vector3(3, 0, -10)
])

export { goundFloorPath, firstFloorPath, secondFloorPath }
