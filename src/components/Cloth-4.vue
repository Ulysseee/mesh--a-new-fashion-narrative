<template>
	<div data-cloth="4" class="cloth cloth4">
		<h2 class="cloth__title">
			<div>Distribution &</div>
			<div>recyclage/fin de vie.</div>
		</h2>

		<h3 class="cloth__subtitle">
			Un français achète en moyenne 30 kg de vêtements par an.
		</h3>

		<div class="cloth__infos">
			<p class="cloth__paragraph">
				À force des lavages des vêtement en polyester, c’est chaque
				année 500 000 tonnes de micro-plastiques qui finissent dans les
				océans. Étant non bio-dégradables, celles-ci sont ingérés par
				les poissons, qui finissent in fine dans nos assiettes.
			</p>
			<p class="cloth__paragraph">
				La durée d’utilisation des vêtements n’est pas limitée seulement
				par la mode, mais aussi par leur faible qualité, ce qui les rend
				difficiles à revendre ou à donner. Ils sont de plus difficiles à
				recycler à cause du polyester.
			</p>
		</div>

		<h3 class="cloth__subtitle">
			Chaque année en Europe, 4 millions de tonnes de textile sont jetées.
		</h3>

		<p class="cloth__paragraph">
			Seulement 20% des vêtements sont recyclés par an, contre 80% qui
			finissent dans des décharges ou incinérés. En 2017, sur 184 000
			tonnes de vêtement triés en France, les 2/3 ont été réutilisés pour
			être reportés, le dernier a été recyclé pour produire des chiffons
			ou de l’isolant.
		</p>
	</div>
</template>

<script>
import gsap from 'gsap'
import SplitType from 'split-type'

export default {
	mounted() {
		document.querySelectorAll('.cloth__title div').forEach((el) => {
			const heading = new SplitType(el, {
				types: 'chars',
				tagName: 'span'
			})
			gsap.set(heading.chars, {
				opacity: 0,
				y: '100%',
				rotate: 20
			})
		})

		document.querySelectorAll('.cloth__subtitle').forEach((el) => {
			const splitedEl = new SplitType(el, {
				types: 'words',
				tagName: 'span'
			})
			gsap.set(splitedEl.words, {
				opacity: 0,
				y: '100%'
			})
		})

		document.querySelectorAll('.cloth__paragraph').forEach((el) => {
			const splitedEl = new SplitType(el, {
				types: 'words',
				tagName: 'span'
			})
			gsap.set(splitedEl.words, {
				opacity: 0
			})
		})
	}
}
</script>

<style scoped lang="scss">
.cloth4 {
	color: inherit;
	display: none;

	.cloth__title {
		font-family: 'Brilliant Cut Pro Regular';
		text-transform: uppercase;
		letter-spacing: -1px;
		font-size: 4.5rem;
		line-height: 1;
		padding: 0 3rem;
		margin: 4rem 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.cloth__subtitle {
		padding: 0 3rem;
		margin: 4rem 0;
		font-size: 1.5rem;
		line-height: 2.25rem;
		font-family: 'PP Telegraf Light';
		overflow: hidden;
	}

	.cloth__infos {
		width: 65%;
		margin: 4rem 0 4rem auto;
		padding: 0 3rem;
		font-family: 'PP Telegraf Light';
	}

	.cloth__paragraph {
		padding: 0 3rem;
		margin: 2rem 0;
		font-size: 1.125rem;
	}

	.cloth__highlight {
		background: #e54343;
		// transform: skewY(-15deg);
	}

	&.active {
		display: block;
	}
}
</style>
