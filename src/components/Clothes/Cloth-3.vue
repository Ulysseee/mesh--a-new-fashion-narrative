<template>
	<div data-cloth="3" class="cloth cloth3">
		<h2 class="cloth__title">
			<div>Exportation &</div>
			<div>transport.</div>
		</h2>

		<h3 class="cloth__subtitle">
			Entre le champs de coton et la boutique ou il est vendu, un vêtement
			peut avoir parcouru 65 000 kilomètres, soit 1.5 fois le tour de la
			Terre. En France, 50% des vêtements vendus sont importés de Chine
			par exemple.
		</h3>

		<h3 class="cloth__subtitle">
			En combinant la production et le transport, l’industrie textile
			produit chaque année 1.2 milliards de tonnes de gaz à effets de
			serre.
		</h3>

		<h3 class="cloth__subtitle">
			Rien qu’en ce qui concerne la mode en ligne, celle-ci représente le
			tiers des livraisons et du transport de marchandises, déjà lui-même
			responsables de 10% des émissions de gaz à effet de serre.
		</h3>
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
.cloth3 {
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
