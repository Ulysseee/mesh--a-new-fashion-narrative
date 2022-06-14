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
		new Vector3(-15, 3, -15),
		new Vector3(15, 3, -15),
		new Vector3(15, 3, 15),
		new Vector3(-15, 3, 15)
	],
	true
)

export { galleryPath, metaversPath }
