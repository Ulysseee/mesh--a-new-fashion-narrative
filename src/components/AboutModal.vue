<template>
	<div ref="aboutModal" class="informations">
		<div class="informations__close" @click="$emit('onHappy')"></div>
		<h2 class="informations__title">About</h2>
		<p class="informations__description">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
			ipsum voluptatum quas ab odit, ea sed cum rerum id possimus aut
			aperiam distinctio fugit reiciendis eligendi facilis fuga neque
			accusantium. Vero cum natus dicta mollitia ad tempora ut. Eum quidem
			qui, nam quia repellat corrupti eaque nesciunt necessitatibus, id
			adipisci, modi repudiandae hic. Fuga facilis ad asperiores
			repudiandae consequuntur soluta! Iusto quae accusamus cumque tempore
			dolor, perferendis, maxime provident ab cum autem dolorum id
			similique sint deserunt ut blanditiis illum esse rem cupiditate
			delectus porro. Nihil cum ducimus vitae vero. Saepe autem nulla
			ducimus deleniti deserunt. Obcaecati cumque, blanditiis inventore
			exercitationem labore quidem expedita earum mollitia eligendi? Iste
			eos nisi libero pariatur repellat, omnis dolorum sequi vero, ut,
			itaque exercitationem.
		</p>

		<p class="informations__footer">Thank you</p>
		<img src="/assets/img/star.svg" alt="" />
	</div>
</template>

<script>
export default {
	emits: ['onHappy']
}
</script>

<style scoped lang="scss">
.informations {
	background-color: var(--c-white);
	height: 95vh;
	position: absolute;
	z-index: 99;
	top: 0px;
	right: 0;
	width: 50%;
	overflow: hidden;
	padding: 0;
	margin: 0;
	border-bottom-left-radius: 80px;
	color: var(--c-dark-blue);
	border: 0.5px solid var(--c-dark-blue);
	transform: translateX(100%);
	font-family: 'PP Telegraf Light';

	&__close {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--c-light-blue);
		margin: 15px;
	}

	&__title {
		color: var(--c-dark-blue);
		width: 150px;
		height: 150px;
		border: 0.25px solid var(--c-dark-blue);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
		margin-top: 10px;
		font-family: 'Brilliant Cut Pro';
	}

	&__description {
		width: 60%;
		margin: 50px auto;
		color: inherit;
	}

	&__footer {
		text-align: center;
	}
}
</style>
