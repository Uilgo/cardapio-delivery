<template>
	<UiCard variant="default" padding-size="none" class="sticky top-4">
		<!-- Header do Carrinho -->
		<div class="px-4 py-3 border-b border-[rgb(var(--ui-border-base))]">
			<div class="flex items-center gap-2">
				<Icon name="lucide:shopping-bag" class="w-5 h-5 text-[rgb(var(--ui-primary))]" />
				<h2 class="text-lg font-bold text-[rgb(var(--ui-text-primary))]">Seu Pedido</h2>
				<UiBadge v-if="totalItems > 0" variant="primary" size="sm" class="ml-auto">
					{{ totalItems }} {{ totalItems === 1 ? "item" : "itens" }}
				</UiBadge>
			</div>
		</div>

		<!-- Carrinho Vazio -->
		<div v-if="items.length === 0" class="px-4 py-12 text-center">
			<div
				class="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgb(var(--ui-bg-muted))] flex items-center justify-center"
			>
				<Icon name="lucide:shopping-cart" class="w-8 h-8 text-[rgb(var(--ui-text-muted))]" />
			</div>
			<h3 class="text-base font-semibold text-[rgb(var(--ui-text-primary))] mb-1">
				Carrinho vazio
			</h3>
			<p class="text-sm text-[rgb(var(--ui-text-secondary))]">Adicione itens do cardápio</p>
		</div>

		<!-- Lista de Itens -->
		<div v-else class="divide-y divide-[rgb(var(--ui-border-base))]">
			<div
				v-for="item in items"
				:key="item.id"
				class="px-4 py-3 hover:bg-[rgb(var(--ui-bg-muted))] transition-colors"
			>
				<div class="flex gap-3">
					<!-- Imagem do Produto -->
					<div class="w-16 h-16 bg-[rgb(var(--ui-bg-muted))] rounded-lg overflow-hidden shrink-0">
						<img
							v-if="item.imagem"
							:src="item.imagem"
							:alt="item.nome"
							class="w-full h-full object-cover"
						/>
						<div v-else class="w-full h-full flex items-center justify-center text-2xl opacity-30">
							🍽️
						</div>
					</div>

					<!-- Informações do Item -->
					<div class="flex-1 min-w-0">
						<h4 class="text-sm font-semibold text-[rgb(var(--ui-text-primary))] mb-1 line-clamp-1">
							{{ item.nome }}
						</h4>
						<p class="text-sm font-bold text-[rgb(var(--ui-primary))] mb-2">
							R$ {{ formatPrice(item.preco) }}
						</p>

						<!-- Controles de Quantidade -->
						<div class="flex items-center gap-2">
							<button
								type="button"
								class="w-7 h-7 rounded-lg border border-[rgb(var(--ui-border-base))] flex items-center justify-center hover:bg-[rgb(var(--ui-bg-muted))] transition-colors cursor-pointer"
								@click="$emit('decrease', item.id)"
							>
								<Icon name="lucide:minus" class="w-3.5 h-3.5" />
							</button>
							<span
								class="text-sm font-semibold text-[rgb(var(--ui-text-primary))] min-w-[2rem] text-center"
							>
								{{ item.quantidade }}
							</span>
							<button
								type="button"
								class="w-7 h-7 rounded-lg border border-[rgb(var(--ui-border-base))] flex items-center justify-center hover:bg-[rgb(var(--ui-bg-muted))] transition-colors cursor-pointer"
								@click="$emit('increase', item.id)"
							>
								<Icon name="lucide:plus" class="w-3.5 h-3.5" />
							</button>
							<button
								type="button"
								class="ml-auto text-[rgb(var(--ui-error))] hover:opacity-70 transition-opacity cursor-pointer"
								@click="$emit('remove', item.id)"
							>
								<Icon name="lucide:trash-2" class="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer com Total e Botão -->
		<div v-if="items.length > 0" class="px-4 py-4 border-t border-[rgb(var(--ui-border-base))]">
			<!-- Subtotal -->
			<div class="flex items-center justify-between mb-3">
				<span class="text-sm text-[rgb(var(--ui-text-secondary))]">Subtotal</span>
				<span class="text-base font-semibold text-[rgb(var(--ui-text-primary))]">
					R$ {{ formatPrice(subtotal) }}
				</span>
			</div>

			<!-- Botão Finalizar Pedido -->
			<UiButton variant="solid" size="md" full-width @click="$emit('checkout')">
				<Icon name="lucide:check-circle" class="w-5 h-5 mr-2" />
				Finalizar Pedido
			</UiButton>
		</div>
	</UiCard>
</template>

<script setup lang="ts">
import type { Produto } from "~/mocks";
import UiCard from "~/components/ui/Card.vue";
import UiBadge from "~/components/ui/Badge.vue";
import UiButton from "~/components/ui/Button.vue";

/**
 * 📌 Cart Component
 *
 * Componente de carrinho de compras com lista de itens,
 * controles de quantidade e resumo do pedido.
 */

interface CartItem extends Produto {
	quantidade: number;
}

interface Props {
	items?: CartItem[];
}

const props = withDefaults(defineProps<Props>(), {
	items: () => [],
});

defineEmits<{
	increase: [id: number];
	decrease: [id: number];
	remove: [id: number];
	checkout: [];
}>();

/**
 * Total de itens no carrinho
 */
const totalItems = computed(() => {
	return props.items.reduce((total, item) => total + item.quantidade, 0);
});

/**
 * Subtotal do carrinho
 */
const subtotal = computed(() => {
	return props.items.reduce((total, item) => {
		const preco = typeof item.preco === "string" ? parseFloat(item.preco) : item.preco;
		return total + preco * item.quantidade;
	}, 0);
});

/**
 * Formata o preço para exibição
 */
const formatPrice = (price: string | number): string => {
	const numPrice = typeof price === "string" ? parseFloat(price) : price;
	return numPrice.toFixed(2).replace(".", ",");
};
</script>

<style scoped>
.line-clamp-1 {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
