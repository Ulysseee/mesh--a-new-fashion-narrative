<template>
	<div class="header__timeline__wrapper">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 40">
			<path
				class="room lounge"
				d="M65.94 20l-10.66 4 18.11 6.82 10.66-4-9.28-3.49 3-1.13-8.83-3.32z"
				fill-rule="evenodd"
			></path>
			<path
				class="room school"
				d="M28.01 10.33l31.97 12.04-4.58 1.73-31.98-12.04 4.59-1.73z"
			></path>
			<path
				class="room court"
				d="M23.54 12.01l19.02 7.17-21.31 8.03-19.03-7.17 21.32-8.03z"
			></path>
			<g>
				<path
					class="outline"
					fill="none"
					stroke="#eae8db"
					stroke-width="1.3"
					opacity=".3"
					style="isolation: isolate"
					d="M52.19 38.87L2.22 20.04l50.2-18.9 49.97 18.82-50.2 18.91z"
				></path>
				<path
					d="M21.18 27.18l-.61.23h1.21zM2.22 20l-.61-.23v.46zm40.16-.84L43 19h-1.23zm31 11.68l-.61.23H74zm4-1.51l.61-.23H76.8zm0 0l-.6.23H78zm6.65-2.51l.61.23v-.46zm-9.28-3.49l-.61-.23v.46zm3-1.13l.61.23V22zm-8.83-3.32l.61-.23h-1.22zm-6.65 2.5l-.6-.22v.45zm0 0l.6.23v-.41zm-2.41.91l-.61.23h1.22zM28 10.33l.6-.23h-1.2zm-4.59 1.73l-.61-.23v.46zm0 0l.61.23v-.46zM21.78 27l-19-7.14-1.22.46 19 7.14zm20-8l-21.2 8 1.21.46 21.21-8zM74 30.65L43 19l-1.22.46 31 11.68zm2.8-1.51l-4 1.51 1.22.46 4-1.51zm1.21 0l-1.21.46zm5.43-2.51l-6.64 2.51 1.2.46 6.65-2.51zm-9.28-3l9.28 3.49 1.22-.46-9.28-3.49zm3-1.58l-3 1.12 1.22.46 3-1.13zm-8.83-2.87l8.83 3.32 1.2-.5-8.83-3.33zm-5.43 2.5l6.65-2.5-1.22-.46-6.66 2.48zm0-.45l-1.21.45zm-2.4 1.36l2.4-.91-1.21-.45-2.41.9zm-33.08-12l31.86 12 1.22-.46-31.87-12zM24 12.29l4.58-1.73-1.18-.46-4.59 1.73zm0-.46l-1.22.46zM2.83 20.27l21.2-8-1.22-.46-21.2 8z"
					fill="#eae8db"
				></path>
				<path
					d="M2.22 14.26l25.85-9.72v5.83L2.22 20.1z"
					fill="#cccab8"
				></path>
				<path
					d="M59.84 16.53l-31.77-12v5.83l31.77 12z"
					fill="#eae8db"
				></path>
				<path
					d="M59.84 16.53l9.07-3.4V19l-9.07 3.41z"
					fill="#cccab8"
				></path>
				<path
					d="M77.75 16.45l-8.83-3.32V19l8.83 3.33z"
					fill="#eae8db"
				></path>
				<path
					d="M77.75 16.45l-3.08 1.06v5.83l3.08-1.05zM70.39 17.37l1.21.45a1.61 1.61 0 011 1.41.68.68 0 01-1 .69l-1.21-.45a1.61 1.61 0 01-1-1.41.68.68 0 011-.69z"
					fill="#cccab8"
				></path>
				<path
					d="M74 18.66l1.22.45a1.64 1.64 0 011 1.42.69.69 0 01-1 .69L74 20.77a1.64 1.64 0 01-1-1.42.69.69 0 011-.69z"
					fill="#cccab8"
				></path>
				<path
					d="M84.07 21.05l-9.4-3.54v5.83l9.24 3.49z"
					fill="#eae8db"
				></path>
			</g>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'ExperienceTimeline'
}
</script>

<style scoped lang="scss">
.header__timeline__wrapper {
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	width: 100px;
	height: 40px;
}

.room {
	transition: fill 0.5s ease-in;
}

.room.is-active {
	fill: yellow;
}
</style>
