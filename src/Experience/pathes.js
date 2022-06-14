import { CatmullRomCurve3, Vector3 } from 'three'

const galleryPath = new CatmullRomCurve3(
	[
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
		new Vector3(5, 0, -11),
		new Vector3(5, 0, 0),
		new Vector3(6, 0, 11),
		new Vector3(20, 0, 11),
		new Vector3(30, -2, 11),
		new Vector3(33, -3, 11)
	],
	true
)

const metaversPath = new CatmullRomCurve3(
	[
		new Vector3(0, 3, 0),
		new Vector3(-3, 3, -5),
		new Vector3(-10, 3, -9),
		new Vector3(-14, 3, -10),
		new Vector3(-12, 3, -15),
		new Vector3(-9, 3, -10),
		new Vector3(-4, 3, -8),
		new Vector3(0, 3, -4)
	],
	true
)

const cameraTargetPositions = [
	{
		x: 21,
		y: 2.5,
		z: 0
	},
	{
		x: 0,
		y: 1.5,
		z: 0
	},
	{
		x: -18,
		y: 1.5,
		z: 11
	},
	{
		x: -3,
		y: 1.5,
		z: 0
	},
	{
		x: -18,
		y: 1.5,
		z: -11
	},
	{
		x: 15,
		y: 4.25,
		z: 0
	}
]

export { galleryPath, metaversPath, cameraTargetPositions }
