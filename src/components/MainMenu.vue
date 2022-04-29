<template>
	<header ref="header" class="navigation">
		<div class="navigation__logo">
			<ul class="navigation__logo__list">
				<li class="navigation__logo__img">Mesh</li>
				<li class="navigation__logo__description">
					a new fashion narrative
				</li>
			</ul>
		</div>
		<div class="navigation__controls">
			<button
				:class="
					'navigation__controls__sound ' +
					(isSoundActive ? 'is-active' : '')
				"
				@click="togglePlay"
			>
				<span class="svelte-1rw298u" style="--i: 6"></span>
				<span class="svelte-1rw298u" style="--i: 11"></span>
				<span class="svelte-1rw298u" style="--i: 17"></span>
				<span class="svelte-1rw298u" style="--i: 10"></span>
				<span class="svelte-1rw298u" style="--i: 15"></span>
				<span class="svelte-1rw298u" style="--i: 6"></span>
			</button>
			<button
				:class="
					'navigation__controls__infos ' +
					(isInfosActive ? 'is-active' : '')
				"
				@click="isInfosActive = true"
			>
				about
			</button>
		</div>

		<!-- <div :class="'informations ' + (isInfosActive ? 'is-active' : '')">
			voici quelques informations
			<button class="informationsClose" @click="isInfosActive = false">
				close
			</button>
		</div> -->

		<button class="button-hold">
			<div>
				<svg class="progress" viewBox="0 0 32 32">
					<circle r="8" cx="16" cy="16" />
				</svg>
				<!-- <svg class="tick" viewBox="0 0 24 24">
					<polyline points="18,7 11,16 6,12" />
				</svg> -->
			</div>
		</button>
	</header>
</template>

<script>
import SoundClass from '@classes/SoundClass'
export default {
	name: 'MainMenu',
	data() {
		return {
			isSoundActive: true,
			isInfosActive: false
		}
	},

	mounted() {
		this.audio = new SoundClass('/assets/music.mp3')
	},
	methods: {
		togglePlay() {
			if (!this.isSoundActive) {
				this.audio.play()
				this.isSoundActive = true
			} else {
				this.audio.pause()
				this.isSoundActive = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
.navigation {
	top: 20px;
	position: absolute;
	transform: translate(-50%, -0%);
	// overflow: hidden;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 90%;
	left: 50%;

	&__logo {
		position: relative;
		font-size: 10px;
		color: #fff;
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
	}

	.navigation__controls__sound {
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
			background-color: #fff;
			transform: scaleY(2);
		}

		span:not(:last-child) {
			margin-right: 3px;
		}

		&:hover {
			background: rgba(239, 239, 239, 0.2);
		}
	}

	.navigation__controls__sound.is-active span {
		animation: scaleSound 1s ease infinite alternate;
		animation-delay: calc(var(--i) * 75ms);
	}

	&__controls__infos {
		background: transparent;
		border: none;
		color: #fff;
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

.informations {
	background-color: #fff;
	height: 100%;
	position: absolute;
	top: 100px;
	bottom: 0;
	right: 0;
	left: 0;
	width: 100%;
	max-width: 90%;
	margin: auto;
	overflow: hidden;
	transform: translate(0, 100%);
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
