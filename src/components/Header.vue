<template>
	<header ref="header" class="header">
		<div class="header__logo">
			<ul class="header__logo__list">
				<li class="header__logo__img">Mesh</li>
				<li class="header__logo__description">
					a new fashion narrative
				</li>
			</ul>
		</div>
		<div class="header__controls">
			<button
				:class="
					'header__controls__sound ' +
					(isSoundActive ? 'is-active' : '')
				"
				@click="toggleSound"
			>
				<span class="svelte-1rw298u" style="--i: 6"></span>
				<span class="svelte-1rw298u" style="--i: 11"></span>
				<span class="svelte-1rw298u" style="--i: 17"></span>
				<span class="svelte-1rw298u" style="--i: 10"></span>
				<span class="svelte-1rw298u" style="--i: 15"></span>
				<span class="svelte-1rw298u" style="--i: 6"></span>
			</button>
			<button
				class="header__controls__infos"
				@click="toggleModal"
				@onHappy="toggleModal"
			>
				about
			</button>
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
	<AboutModal />
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
			console.log('yes')
			if (!this.isAboutActive) {
				gsap.to('.informations', {
					x: 0,
					duration: 0.5,
					ease: 'power3.easeInOut'
				})
			} else {
				gsap.to('.informations', {
					x: '100%',
					duration: 0.5,
					ease: 'power3.easeInOut'
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

	width: 90%;
	left: 50%;

	&__logo {
		position: relative;
		font-size: 10px;
		color: var(--c-white);
		font-family: 'Brilliant Cut Pro';
		text-transform: uppercase;

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

	&__controls {
		position: relative;
		font-size: 80px;
		display: flex;
		align-items: center;

		&__sound {
			cursor: pointer;
			transition: opacity 0.5s ease-out;
			margin-right: 15px;
			background: transparent;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			border: 1px solid rgba(239, 239, 239, 0.2);
			border-radius: 50px;
			width: 50px;
			transition: all 0.4s ease;

			height: 50px;

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

		&__infos {
			background: transparent;
			border: none;
			color: var(--c-white);
			text-transform: uppercase;
			height: 50px;
			font-size: 10px;
			font-family: 'Brilliant Cut Pro';
			cursor: pointer;
			border: 1px solid rgba(239, 239, 239, 0.2);
			border-radius: 50px;
			padding: 10px 20px;
			transition: all 0.4s ease;

			&:hover {
				background: rgba(239, 239, 239, 0.2);
			}
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
