import { AnimationMixer, Group, Vector2, Mesh } from 'three'
import Experience from '../Experience.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

export default class Flower {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		// Resource
		this.resource = this.resources.items.flower
		this.flower = SkeletonUtils.clone(this.resource.scene)
		this.setModel()
		// this.setAnimation()
	}

	setModel() {
		const vec = new Vector2()

		this.group = new Group()
		console.log(this.flower)
		this.flower.position.set(3, 0, -1)

		this.flower.traverse((child) => {
			if (child instanceof Mesh) {
				child.scale.set(0.0525, 0.0525, 0.0525)
			}
		})
		this.scene.add(this.flower)
	}

	setAnimation() {
		this.animation = {}
		this.animation.mixer = new AnimationMixer(this.resource.scene)
		this.animation.action = this.animation.mixer.clipAction(
			this.resource.animations[0]
		)

		this.animation.action.setEffectiveTimeScale(6)
		this.animation.action.play()

		// for (const key in actions) {
		// 	actions[key].setEffectiveTimeScale(6)
		// 	setTimeout(() => {
		// 		actions[key].play()
		// 	}, Math.random() * 1000)
		// }
		// group.current.rotation.y = offset

		// vec.set(clock.elapsedTime, clock.elapsedTime)
		// group.current.position.set(0, fbm.get2(vec), 0)
		// group.current.rotation.y -= dt
	}

	update() {
		// setTimeout(() => {
		// 	this.animation.mixer.update(this.time.delta * 0.01)
		// }, Math.random() * 1000)
	}
}

// import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'
// import { MathUtils } from 'three'
// import { FBM } from 'three-noise'

// const vec = new Vector2()
// export function Butterfly(props) {
//   const group = useRef()
//   const { scene, animations } = useGLTF('/models/butterfly.glb')
//   const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
//   const { actions } = useAnimations(animations, group)
//   const fbm = useMemo(() => new FBM({ seed: Math.random() }), [])
//   const offset = useMemo(() => Math.random() * 100, [])

//   useEffect(() => {
//     for (const key in actions) {
//       actions[key].setEffectiveTimeScale(6)
//       setTimeout(() => {
//         actions[key].play()
//       }, Math.random() * 1000)
//     }
//     group.current.rotation.y = offset
//   }, [])

//   useFrame(({ clock }, dt) => {
//     vec.set(clock.elapsedTime, clock.elapsedTime)
//     group.current.position.set(0, fbm.get2(vec), 0)
//     group.current.rotation.y -= dt
//   })

//   return (
//     <group ref={group} dispose={null}>
//       <group {...props}>
//         <group scale={0.15} rotation-y={Math.PI / 4} position-y={MathUtils.randFloat(-3, 1)}>
//           <primitive object={cloneScene} />
//         </group>
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('/scene (3).glb')
