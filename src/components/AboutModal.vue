<template>
	<div ref="aboutModal" class="about">
		<div class="about__close" @click="$emit('toggle-about')"></div>
		<h2 class="about__title">About</h2>
		<p class="about__description">
			Comment pérenniser l’industrie de la mode à travers une consommation
			numérisée plus viable pour l’environnement ?
		</p>

		<p class="about__description">
			C’est la question que nous nous sommes posée lors de la mise en
			place de Mesh, une expérience interactive, immersive et didactique
			qui porte une réflexion sur les enjeux environnementaux actuels
			auxquels la Mode doit se confronter.
		</p>

		<p class="about__description">
			C’est la question que nous nous sommes posée lors de la mise en
			place de Mesh, une expérience interactive, immersive et didactique
			qui porte une réflexion sur les enjeux environnementaux actuels
			auxquels la Mode doit se confronter.
		</p>

		<div class="about__footer">
			<p>Thank you</p>
			<img class="about__starIcon" src="/assets/img/star.svg" alt="" />
		</div>
	</div>
</template>

<script>
export default {
	emits: ['toggle-about']
}
</script>

<style scoped lang="scss">
.about {
	// background-color: var(--c-transparent);
	background-color: rgba(0, 0, 0, 1);
	height: 100vh;
	position: absolute;
	z-index: -1;
	bottom: 0px;
	right: 0px;
	// backdrop-filter: blur(10px);

	width: 100vw;
	overflow: hidden;
	padding: 0;
	margin: 0;
	// border-bottom-left-radius: 80px;
	color: var(--c-white);
	font-family: 'PP Telegraf Light';

	display: flex;
	flex-direction: column;

	&__close {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		// background-color: var(--c-black);
		background-color: var(--c-white);
		transition: all 200ms ease-in;
		margin: 15px;

		// &:hover {
		// 	background-color: var(--c-transparent);
		// }
	}

	&__title {
		color: var(--c-white);
		width: 120px;
		height: 120px;
		border: 0.25px solid var(--c-white);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 3rem auto 3rem;
		font-size: 18px;
		font-family: 'Brilliant Cut Pro';
	}

	&__description {
		width: 60%;
		// margin: 50px auto;
		margin: 0.5rem auto;
		color: inherit;
	}

	&__footer {
		text-align: center;
		margin-top: auto;
		margin-bottom: 2rem;
		p {
			margin: 0;
		}
	}

	&__starIcon {
		margin: auto;
		display: flex;
		justify-content: center;
	}
}
</style>
