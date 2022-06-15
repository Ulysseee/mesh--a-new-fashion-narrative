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
		new Vector3(-15, 7, -15),
		new Vector3(15, 7, -15),
		new Vector3(15, 7, 15),
		new Vector3(-15, 7, 15)
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

const cameraPositionMat = [
	{
		x: 4.5,
		y: 2,
		z: -6.5
	},
	{
		x: 4.0,
		y: 2.5,
		z: -3.5
	},
	{
		x: 4.0,
		y: 3.0,
		z: 0.5
	}
]

const cameraPositionConcept = [
	{
		x: -14.0,
		y: 2.5,
		z: 8.5
	},
	{
		x: -14.0,
		y: 2.5,
		z: 8
	},
	{
		x: -15.5,
		y: 2,
		z: 4.25
	},
	{
		x: -15.5,
		y: 2.0,
		z: 3.25
	}
]

export {
	galleryPath,
	metaversPath,
	cameraTargetPositions,
	cameraPositionMat,
	cameraPositionConcept
}
