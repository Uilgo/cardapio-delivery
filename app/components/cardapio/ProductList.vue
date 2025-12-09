<template>
	<div class="container mx-auto px-3 min-[400px]:px-4 py-4 min-[400px]:py-6">
		<!-- Lista de Produtos -->
		<div v-if="produtos.length > 0" class="flex flex-col gap-3 min-[400px]:gap-4">
			<ProductCard
				v-for="produto in produtos"
				:key="produto.id"
				:produto="produto"
				@add="$emit('add', $event)"
				@click="$emit('click', $event)"
			/>
		</div>

		<!-- Empty State -->
		<UiEmptyState
			v-else
			icon="🍽️"
			title="Nenhum produto encontrado"
			description="Não há produtos disponíveis nesta categoria no momento. Tente selecionar outra categoria."
			action-label="Ver Todos"
			action-variant="outline"
			@action="$emit('clear-filters')"
		/>
	</div>
</template>

<script setup lang="ts">
import ProductCard from "./ProductCard.vue";
import type { Produto } from "~/mocks";

interface Props {
	produtos: Produto[];
}

defineProps<Props>();

defineEmits<{
	add: [produto: Produto];
	click: [produto: Produto];
	"clear-filters": [];
}>();
</script>
