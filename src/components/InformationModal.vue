<template>
	<div class="information">
		<div
			class="information__close"
			@click="$emit('toggle-information')"
		></div>
		<h2 class="information__title">Informations</h2>
		<p class="information__description">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
			ipsum voluptatum quas ab odit, ea sed cum rerum id possimus aut
			aperiam distinctio fugit reiciendis eligendi facilis fuga neque
			accusantium. Vero cum natus dicta mollitia ad tempora ut. Eum quidem
			qui, nam quia repellat corrupti eaque nesciunt necessitatibus, id
			adipisci, modi repudiandae hic. Fuga facilis ad asperiores
			repudiandae consequuntur soluta! Iusto quae accusamus cumque tempore
			dolor, perferendis, maxime provident ab cum autem dolorum id
		</p>

		<p class="information__footer">Fin des informations</p>
		<img class="information__starIcon" src="/assets/img/star.svg" alt="" />
	</div>
</template>

<script>
export default {
	emits: ['toggle-information']
}
</script>

<style scoped lang="scss">
.information {
	background-color: var(--c-transparent);
	height: 85vh;
	position: absolute;
	z-index: 99;
	bottom: 0px;
	right: 0px;
	backdrop-filter: blur(10px);

	width: 40%;
	overflow: hidden;
	padding: 0;
	margin: 0;
	border-bottom-left-radius: 80px;
	color: var(--c-white);
	border: 0.5px solid var(--c-white);
	transform: translateX(100%);
	font-family: 'PP Telegraf Light';

	&__close {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--c-white);
		margin: 15px;
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
		margin: auto;
		font-size: 18px;
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

	&__starIcon {
		margin: auto;
		display: flex;
		justify-content: center;
	}
}
</style>
