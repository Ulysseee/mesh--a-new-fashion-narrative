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
				<button class="header__controls__about" @click="toggleModal">
					about
				</button>
			</div>
		</div>
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
				gsap.timeline()
					.to('.about', {
						css: { zIndex: 150 }
					})
					.to('.about', {
						opacity: 1,
						duration: 0.5,
						ease: 'expo.easeInOut'
					})
			} else {
				gsap.timeline()
					.to('.about', {
						opacity: 0,
						duration: 0.5,
						ease: 'expo.easeInOut'
					})
					.to('.about', {
						css: { zIndex: -1 }
					})
			}

			this.isAboutActive = !this.isAboutActive
		}
	}
}
</script>

<style scoped lang="scss">
.header {
	top: 1.2rem;
	position: absolute;
	transform: translate(-50%, -0%);
	z-index: 12;
	display: flex;
	align-items: center;
	width: 95vw;

	left: 50%;

	&__wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	&__logo {
		position: relative;
		font-size: 0.675rem;
		color: var(--c-white);
		font-family: 'Brilliant Cut Pro';
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom-left-radius: 30000px;
		border-top-right-radius: 30000px;
		z-index: 1;

		&__list {
			list-style: none;
			display: flex;
			padding: 0;
		}

		&__description {
			font-family: 'Brilliant Cut Pro Regular';
			opacity: 0.5;
			margin-left: 10px;
		}
	}

	&__controls {
		display: flex;
	}

	&__controls__about {
		position: relative;
		border: 0.5px solid var(--c-white);
		padding: 0 14px;
		border-radius: 30px;
		cursor: pointer;

		font-family: 'Brilliant Cut Pro';
		color: var(--c-white);
		text-transform: uppercase;
		font-size: 0.675rem;
		transition: all 0.4s ease;

		&:hover {
			background: rgba(239, 239, 239, 0.2);
		}
	}

	&__controls__sound {
		cursor: pointer;
		transition: opacity 0.5s ease-out;
		margin-right: 15px;
		display: flex;

		align-items: center;
		justify-content: center;
		border: none;
		overflow: hidden;
		border-radius: 40px;
		width: 34px;
		height: 34px;
		transition: all 0.4s ease;

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
	}

	&__controls__sound.is-active span {
		animation: scaleSound 1s ease infinite alternate;
		animation-delay: calc(var(--i) * 75ms);
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
