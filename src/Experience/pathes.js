import { CatmullRomCurve3, Vector3 } from 'three'

const galleryPath = new CatmullRomCurve3(
	[
		new Vector3(35, -1.5, 9),
		new Vector3(35, -1.5, -9),
		new Vector3(33, -0.5, -11),
		new Vector3(30, 0.5, -11),
		new Vector3(25, 0.5, -11),
		new Vector3(20, 2.5, -11),
		new Vector3(10, 2.5, -11),
		new Vector3(0, 2.5, 11),
		new Vector3(-10, 2.5, 5),
		new Vector3(-8, 2.5, -4),
		new Vector3(-8, 2.5, -11),
		new Vector3(0, 2.5, -11),
		new Vector3(5, 2.5, -11),
		new Vector3(5, 2.5, 0),
		new Vector3(6, 2.5, 11),
		new Vector3(20, 2.5, 11),
		new Vector3(30, 0.5, 11),
		new Vector3(33, -0.5, 11)
	],
	true
)

const metaversPath = new CatmullRomCurve3(
	[
		new Vector3(-15, 3, -15),
		new Vector3(15, 3, -15),
		new Vector3(15, 3, 15),
		new Vector3(-15, 3, 15)
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
