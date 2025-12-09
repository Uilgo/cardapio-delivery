<template>
	<div v-if="produto" class="pb-4 min-h-[50vh]">
		<!-- Imagem -->
		<div class="relative -mx-4 -mt-4 mb-4 h-64 min-[400px]:h-72 bg-gray-100 overflow-hidden">
			<img
				v-if="produto.imagem"
				:src="produto.imagem"
				:alt="produto.nome"
				class="w-full h-full object-cover"
			/>
			<div v-else class="w-full h-full flex items-center justify-center text-8xl opacity-30">
				🍽️
			</div>
		</div>

		<!-- Informações -->
		<div class="space-y-4">
			<!-- Nome e Preço -->
			<div>
				<h2 class="text-2xl min-[400px]:text-3xl font-bold text-gray-900 mb-2">
					{{ produto.nome }}
				</h2>
				<div class="flex items-center gap-2">
					<span class="text-3xl min-[400px]:text-4xl font-bold text-[rgb(var(--ui-primary))]">
						R$ {{ formatPrice(produto.preco) }}
					</span>
					<span
						v-if="produto.categoria"
						class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
					>
						{{ produto.categoria }}
					</span>
				</div>
			</div>

			<!-- Descrição -->
			<div v-if="produto.descricao">
				<h3 class="text-sm font-semibold text-gray-700 mb-1">Descrição</h3>
				<p class="text-gray-600 leading-relaxed">
					{{ produto.descricao }}
				</p>
			</div>

			<!-- Quantidade -->
			<div>
				<h3 class="text-sm font-semibold text-gray-700 mb-2">Quantidade</h3>
				<div class="flex items-center gap-3">
					<button
						type="button"
						:disabled="quantidade <= 1"
						class="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
						@click="quantidade > 1 && quantidade--"
					>
						<Icon name="lucide:minus" class="w-5 h-5 text-gray-700" />
					</button>

					<span class="text-xl font-bold text-gray-900 min-w-[3rem] text-center">
						{{ quantidade }}
					</span>

					<button
						type="button"
						class="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
						@click="quantidade++"
					>
						<Icon name="lucide:plus" class="w-5 h-5 text-gray-700" />
					</button>
				</div>
			</div>

			<!-- Total -->
			<div class="flex items-center justify-between py-3 border-t">
				<span class="text-gray-600">Total</span>
				<span class="text-2xl font-bold text-[rgb(var(--ui-primary))]">
					R$ {{ formatPrice(total) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Produto } from "~/mocks";

interface Props {
	produto: Produto | null;
}

const props = defineProps<Props>();

const quantidade = ref(1);

const total = computed(() => {
	if (!props.produto) return 0;
	const preco =
		typeof props.produto.preco === "string" ? parseFloat(props.produto.preco) : props.produto.preco;
	return preco * quantidade.value;
});

const formatPrice = (price: string | number) => {
	const numPrice = typeof price === "string" ? parseFloat(price) : price;
	return numPrice.toFixed(2).replace(".", ",");
};

// Resetar quantidade quando mudar de produto
watch(
	() => props.produto,
	() => {
		quantidade.value = 1;
	},
);
</script>
