<template>
	<div data-cloth="1" class="cloth cloth1">
		<h2 class="cloth__title">
			<div>Les</div>
			<div>matériaux.</div>
		</h2>

		<h3 class="cloth__subtitle">
			26 % des vêtements sont en coton. En 2017, 25 millions de tonnes de
			ce matériau a été produit.
		</h3>

		<div class="cloth__infos">
			<p class="cloth__paragraph">
				La culture du coton est la plus polluante de la planète. Afin de
				protéger cette ressource des dangers extérieurs, un quart des
				pesticides utilisés dans le monde est destiné à cette culture
				qui requiert également 4 % des fertilisants à l’azote et au
				phosphore dans le monde. Les pesticides contiennent des dérivés
				de l’arsenic qui mettent la santé des travailleurs en danger et
				polluent les sols, les eaux et la biodiversité.
			</p>
			<p class="cloth__paragraph">
				Cette matière nécessite une exposition de 120 jours de soleil
				par an et une forte quantité d’eau. Une étude menée par l’UNESCO
				dévoile que 10 000 litres d’eau sont nécessaires pour produire 1
				kg de coton, dont 33 % d’eau potable. À titre d’exemple, un
				t-shirt représente 2 700 litres, l’équivalent de 70 douches, ou
				la quantité totale d’eau consommée par un français pendant 17
				jours.
			</p>
		</div>

		<h3 class="cloth__subtitle">
			En 2015, 40 millions de tonnes de tissus en polyester sont
			produites, un tissus fait à base de pétrole, une industrie qui émet
			beaucoup de CO2.
		</h3>

		<p class="cloth__paragraph">
			À titre d'éxample l’emprunte carbone d’un chemisé en polyester est
			2,5 fois plus importante que celle d’une chemise en coton.
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
				rotate: 30
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
.cloth1 {
	color: inherit;

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

	// &.active {
	// 	display: block;
	// }
}
</style>
