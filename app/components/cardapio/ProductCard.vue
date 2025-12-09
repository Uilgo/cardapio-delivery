<template>
	<UiCard
		variant="default"
		padding-size="none"
		:hoverable="true"
		:clickable="true"
		class="overflow-hidden"
		@click="$emit('click', produto)"
	>
		<div class="flex gap-3 min-[400px]:gap-4 p-3 min-[400px]:p-4">
			<!-- Imagem Quadrada à Esquerda -->
			<div
				class="relative w-20 h-20 min-[400px]:w-24 min-[400px]:h-24 sm:w-28 sm:h-28 bg-[rgb(var(--ui-bg-muted))] rounded-lg overflow-hidden shrink-0"
			>
				<!-- Badges de Status -->
				<div
					v-if="produto.emPromocao || produto.destaque"
					class="absolute top-1.5 left-1.5 flex flex-col gap-1 z-10"
				>
					<UiBadge v-if="produto.emPromocao" variant="error" size="xs">
						<Icon name="lucide:percent" class="w-2.5 h-2.5" />
						<span>Promoção</span>
					</UiBadge>
					<UiBadge v-if="produto.destaque" variant="warning" size="xs">
						<Icon name="lucide:star" class="w-2.5 h-2.5" />
						<span>Destaque</span>
					</UiBadge>
				</div>

				<!-- Imagem do Produto -->
				<img
					v-if="produto.imagem"
					:src="produto.imagem"
					:alt="produto.nome"
					class="w-full h-full object-cover"
				/>
				<div
					v-else
					class="w-full h-full flex items-center justify-center text-3xl min-[400px]:text-4xl opacity-30"
				>
					🍽️
				</div>
			</div>

			<!-- Informações à Direita -->
			<div class="flex-1 flex flex-col justify-between min-w-0">
				<!-- Nome e Descrição -->
				<div class="flex-1">
					<h3
						class="text-sm min-[400px]:text-base font-bold text-[rgb(var(--ui-text-primary))] mb-1 line-clamp-1"
					>
						{{ produto.nome }}
					</h3>

					<p
						v-if="produto.descricao"
						class="text-xs min-[400px]:text-sm text-[rgb(var(--ui-text-secondary))] line-clamp-2 mb-2"
					>
						{{ produto.descricao }}
					</p>

					<!-- Tags/Categorias -->
					<div v-if="showTags && produto.categoria" class="flex flex-wrap gap-1 mb-2">
						<UiBadge variant="neutral" size="xs" rounded-size="md">
							{{ produto.categoria }}
						</UiBadge>
					</div>
				</div>

				<!-- Preço e Botão -->
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col">
						<span class="text-lg min-[400px]:text-xl font-bold text-[rgb(var(--ui-primary))]">
							R$ {{ formatPrice(produto.preco) }}
						</span>
						<span
							v-if="produto.precoOriginal && produto.emPromocao"
							class="text-xs text-[rgb(var(--ui-text-muted))] line-through"
						>
							R$ {{ formatPrice(produto.precoOriginal) }}
						</span>
					</div>

					<UiButton variant="solid" size="sm" class="shrink-0" @click.stop="$emit('add', produto)">
						<Icon name="lucide:plus" class="w-4 h-4" />
						<span class="hidden min-[400px]:inline ml-1">Adicionar</span>
					</UiButton>
				</div>
			</div>
		</div>
	</UiCard>
</template>

<script setup lang="ts">
import type { Produto } from "~/mocks";
import UiCard from "~/components/ui/Card.vue";
import UiBadge from "~/components/ui/Badge.vue";
import UiButton from "~/components/ui/Button.vue";

/**
 * 📌 ProductCard Component
 *
 * Card de produto do cardápio com imagem, informações e badges de status.
 * Usa os componentes Card, Badge e Button para manter consistência visual.
 *
 * @prop {Produto} produto - Dados do produto a ser exibido
 * @prop {boolean} showTags - Exibir tags/categorias do produto
 */

interface Props {
	produto: Produto;
	showTags?: boolean;
}

withDefaults(defineProps<Props>(), {
	showTags: false,
});

defineEmits<{
	add: [produto: Produto];
	click: [produto: Produto];
}>();

/**
 * Formata o preço para exibição (ex: 25.90 -> 25,90)
 */
const formatPrice = (price: string | number): string => {
	const numPrice = typeof price === "string" ? parseFloat(price) : price;
	return numPrice.toFixed(2).replace(".", ",");
};
</script>

<style scoped>
/**
 * Utilitários para truncar texto com ellipsis
 */
.line-clamp-1 {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
