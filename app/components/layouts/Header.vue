<template>
	<div class="relative w-full">
		<!-- Header com imagem de capa ou cor -->
		<div class="w-full h-32 md:h-36 relative overflow-hidden" :style="headerStyle">
			<!-- Imagem de capa (se tiver) -->
			<img v-if="imagemCapa" :src="imagemCapa" alt="Capa" class="w-full h-full object-cover" />

			<!-- Overlay opcional para melhorar contraste -->
			<div v-if="imagemCapa" class="absolute inset-0 bg-black/20"></div>
		</div>

		<!-- Container centralizado para logo e nome -->
		<div
			class="max-w-4xl mx-auto px-3 min-[400px]:px-4 relative flex items-center gap-2 min-[400px]:gap-3 sm:gap-4"
		>
			<!-- Logo sobreposta -->
			<div
				class="-mt-6 w-16 h-16 min-[400px]:w-[4.5rem] min-[400px]:h-[4.5rem] sm:w-20 sm:h-20 rounded-lg min-[400px]:rounded-xl shadow-lg overflow-hidden bg-white border-2 min-[400px]:border-[3px] border-white shrink-0"
			>
				<img
					v-if="logo"
					:src="logo"
					:alt="nomeEstabelecimento"
					class="w-full h-full object-cover"
				/>
				<div
					v-else
					class="w-full h-full flex items-center justify-center text-2xl min-[400px]:text-[2.25rem] sm:text-3xl bg-linear-to-br from-primary to-orange-600"
				>
					🍔
				</div>
			</div>

			<!-- Nome do estabelecimento -->
			<div class="flex flex-col justify-center flex-1 min-w-0">
				<h1
					class="text-base min-[400px]:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate"
				>
					{{ nomeEstabelecimento }}
				</h1>
				<p
					v-if="descricao"
					class="text-xs min-[400px]:text-[0.8125rem] sm:text-sm text-gray-600 mt-0.5 truncate"
				>
					{{ descricao }}
				</p>
			</div>

			<!-- Botão Ver Mais -->
			<button
				type="button"
				class="px-3 py-1.5 min-[400px]:px-3.5 min-[400px]:py-1.5 sm:px-4 sm:py-2 text-xs min-[400px]:text-sm font-medium text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shrink-0 cursor-pointer"
				@click="$emit('verMais')"
			>
				Ver Mais
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	nomeEstabelecimento?: string;
	descricao?: string;
	logo?: string;
	imagemCapa?: string;
	corCapa?: string;
}

const props = withDefaults(defineProps<Props>(), {
	nomeEstabelecimento: "Meu Restaurante",
	descricao: "Cardápio Digital",
	logo: "",
	imagemCapa: "",
	corCapa: "#f97316", // primary color
});

defineEmits<{
	verMais: [];
}>();

const headerStyle = computed(() => {
	if (props.imagemCapa) {
		return {};
	}
	return {
		backgroundColor: props.corCapa,
	};
});
</script>
