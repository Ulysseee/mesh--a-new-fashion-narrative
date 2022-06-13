<template>
	<div data-cloth="2" class="cloth cloth2">
		<h2 class="cloth__title">
			<div>Assemblage &</div>
			<div>fabrication</div>
		</h2>

		<h3 class="cloth__subtitle">
			Ce sont 52 collections qui sortent tout les ans chez les acteurs de
			la fast-fashion, et 100 milliards de vêtements sont vendus chaque
			année dans le monde.
		</h3>

		<h3 class="cloth__subtitle">
			4% de l’eau potable disponible dans le monde est destinée à la
			fabrication de vêtements.
		</h3>

		<div class="cloth__infos">
			<p class="cloth__paragraph">
				7000 litres d’eau est la quantité moyenne d’eau nécessaire à la
				production d’un jean
			</p>
			<p class="cloth__paragraph">
				La production d’une tonne de textile est responsable de 200
				litres d’eau polluée.
			</p>
		</div>

		<p class="cloth__paragraph">
			Afin de se donner une image verte, les fabricants ont recours à la
			viscose, à la place du coton. Ce textile nécessite moins d’eau mais
			son procédé de fabrication nécessite des produits chimiques
			dangereux comme le disulfure de carbone 5.
		</p>
		<p class="cloth__paragraph">
			Chrome, mercure, plomb, cuivre, cadmium sont des substances toxiques
			qui sont quotidiennement dans des usines qui produisent du textile
			pour le teinter, le délaver ou pour l’assouplir. Dans les pays en
			voie de développement, par manque de législation, les produits
			chimiques finissent souvent dans la nature à la sortie des usines.
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
.cloth2 {
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
