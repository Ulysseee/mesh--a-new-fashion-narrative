<template>
	<header ref="header" class="header">
		<div class="header__wrapper">
			<div class="header__logo">
				<ul class="header__logo__list">
					<li class="header__logo__img">Mesh</li>
					<li class="header__logo__description">
						a new fashion narrative
					</li>
				</ul>
			</div>

			<button class="header__about" @click="toggleModal">about</button>
		</div>

		<button
			:class="'header__sound ' + (isSoundActive ? 'is-active' : '')"
			@click="toggleSound"
		>
			<span class="svelte-1rw298u" style="--i: 6"></span>
			<span class="svelte-1rw298u" style="--i: 11"></span>
			<span class="svelte-1rw298u" style="--i: 17"></span>
			<span class="svelte-1rw298u" style="--i: 10"></span>
			<span class="svelte-1rw298u" style="--i: 15"></span>
			<span class="svelte-1rw298u" style="--i: 6"></span>
		</button>

		<div class="header__timeline__wrapper">
			<div class="header__timeline__1">
				<div class="header__timeline__1--progress"></div>
			</div>
			<div class="header__timeline__2">
				<div class="header__timeline__2--progress"></div>
			</div>
			<div class="header__timeline__3">
				<div class="header__timeline__3--progress"></div>
			</div>
		</div>
		<button class="button-hold">
			<div>
				<svg class="progress" viewBox="0 0 32 32">
					<circle r="8" cx="16" cy="16" />
				</svg>
				<svg class="tick" viewBox="0 0 24 24">
					<polyline points="18,7 11,16 6,12" />
				</svg>
			</div>
		</button>
	</header>
	<AboutModal @toggle-about="toggleModal" />
</template>

<script>
import gsap from 'gsap'
import AboutModal from './AboutModal.vue'
import SoundClass from '@classes/SoundClass'
export default {
	name: 'MainMenu',
	components: {
		AboutModal
	},
	emits: ['toggle-about'],
	data() {
		return {
			isSoundActive: true,
			isAboutActive: false
		}
	},

	mounted() {
		this.audio = new SoundClass('/assets/music.mp3')
	},
	methods: {
		toggleSound() {
			if (!this.isSoundActive) {
				this.audio.play()
				this.isSoundActive = true
			} else {
				this.audio.pause()
				this.isSoundActive = false
			}
		},

		toggleModal() {
			if (!this.isAboutActive) {
				gsap.to('.about', {
					x: 0,
					duration: 0.5,
					ease: 'expo.easeInOut'
				})
			} else {
				gsap.to('.about', {
					x: '100%',
					duration: 0.5,
					ease: 'expo.easeInOut'
				})
			}

			this.isAboutActive = !this.isAboutActive
		}
	}
}
</script>

<style scoped lang="scss">
.header {
	top: 20px;
	position: absolute;
	transform: translate(-50%, -0%);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 96vw;
	left: 50%;

	&__wrapper {
		display: flex;
		margin-right: 20px;
	}

	&__logo {
		position: relative;
		font-size: 10px;
		color: var(--c-white);
		font-family: 'Brilliant Cut Pro';
		text-transform: uppercase;
		border: 0.5px solid var(--c-white);
		background-color: #98a8a9;
		border-bottom-left-radius: 30000px;
		border-top-right-radius: 30000px;
		padding: 0 40px;
		margin-right: -30px;
		z-index: 1;

		&__list {
			list-style: none;
			display: flex;
			padding: 0;
		}

		&__description {
			opacity: 0.5;
			margin-left: 10px;
		}
	}

	&__about {
		border: 0.5px solid var(--c-white);
		color: var(--c-white);
		text-transform: uppercase;
		font-size: 10px;
		padding: 0 40px 0 60px;
		border-top-right-radius: 50000px;
		position: relative;
		background: var(--c-transparent);
		font-family: 'Brilliant Cut Pro';
		cursor: pointer;
		transition: all 0.4s ease;
		backdrop-filter: blur(10px);
		border-left: none;

		&:hover {
			background: rgba(239, 239, 239, 0.2);
		}
	}

	&__sound {
		cursor: pointer;
		transition: opacity 0.5s ease-out;
		margin-right: 15px;
		background: transparent;
		display: flex;
		backdrop-filter: blur(10px);

		align-items: center;
		justify-content: center;
		background: var(--c-transparent);

		overflow: hidden;
		border: 0.5px solid var(--c-white);
		border-radius: 40px;
		width: 40px;
		transition: all 0.4s ease;

		height: 40px;

		span {
			display: inline-block;
			height: 1px;
			width: 1px;
			background-color: var(--c-white);
			transform: scaleY(2);
		}

		span:not(:last-child) {
			margin-right: 3px;
		}

		&:hover {
			background: rgba(239, 239, 239, 0.2);
		}
	}

	&__sound.is-active span {
		animation: scaleSound 1s ease infinite alternate;
		animation-delay: calc(var(--i) * 75ms);
	}

	&__timeline__wrapper {
		display: flex;
		flex: 1;
		.header__timeline__1,
		.header__timeline__2,
		.header__timeline__3 {
			flex: 1;
			margin: 0 20px;
			height: 1px;
			background: white;
			position: relative;
		}

		.header__timeline__1--progress,
		.header__timeline__2--progress,
		.header__timeline__3--progress {
			position: absolute;
			top: 0;
			left: 0;
			background: red;
			height: 1px;
			width: 100%;
			transform: scaleX(0);
			transform-origin: left center;
		}
	}
}

@keyframes scaleSound {
	0% {
		transform: scaleY(2);
	}
	to {
		transform: scaleY(15);
	}
}
</style>
