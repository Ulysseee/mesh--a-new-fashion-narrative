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
