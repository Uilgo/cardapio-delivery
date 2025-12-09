<template>
	<div class="min-h-screen bg-gray-50 flex flex-col">
		<!-- Conteúdo Principal -->
		<main class="flex-1">
			<slot></slot>
		</main>

		<!-- Footer -->
		<footer class="bg-white border-t mt-auto">
			<div class="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
				<p>© {{ new Date().getFullYear() }} Meu Restaurante - Todos os direitos reservados</p>
			</div>
		</footer>

		<!-- Cart Drawer (Lateral) -->
		<Teleport to="body">
			<Transition name="drawer">
				<div v-if="isCartOpen" class="fixed inset-0 z-50 flex" @click.self="toggleCart">
					<!-- Overlay -->
					<div class="absolute inset-0 bg-black/50" @click="toggleCart"></div>

					<!-- Drawer -->
					<div class="relative ml-auto w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
						<!-- Header do Drawer -->
						<div class="flex items-center justify-between p-4 border-b">
							<h2 class="text-xl font-bold">Carrinho</h2>
							<button
								type="button"
								class="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
								@click="toggleCart"
							>
								✕
							</button>
						</div>

						<!-- Itens do Carrinho -->
						<div class="flex-1 overflow-y-auto p-4">
							<div v-if="cartStore.items.length === 0" class="text-center py-12">
								<span class="text-6xl">🛒</span>
								<p class="text-gray-500 mt-4">Seu carrinho está vazio</p>
							</div>

							<div v-else class="space-y-3">
								<div
									v-for="item in cartStore.items"
									:key="item.id"
									class="flex gap-3 p-3 bg-gray-50 rounded-lg"
								>
									<img
										v-if="item.imagem"
										:src="item.imagem"
										:alt="item.nome"
										class="w-16 h-16 object-cover rounded"
									/>
									<div class="flex-1">
										<h3 class="font-medium text-sm">{{ item.nome }}</h3>
										<p class="text-primary font-bold text-sm">R$ {{ item.preco }}</p>
										<div class="flex items-center gap-2 mt-2">
											<button
												type="button"
												class="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 text-sm cursor-pointer"
												@click="cartStore.diminuir()"
											>
												-
											</button>
											<span class="text-sm font-medium">{{ item.qtd }}</span>
											<button
												type="button"
												class="w-6 h-6 bg-primary text-white rounded hover:bg-primary/90 text-sm cursor-pointer"
												@click="cartStore.adicionar()"
											>
												+
											</button>
											<button
												type="button"
												class="ml-auto text-red-500 text-xs hover:underline cursor-pointer"
												@click="cartStore.remover()"
											>
												Remover
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Footer do Drawer -->
						<div v-if="cartStore.items.length > 0" class="border-t p-4 space-y-3">
							<div class="flex justify-between text-lg font-bold">
								<span>Total:</span>
								<span class="text-primary">R$ {{ cartStore.total.toFixed(2) }}</span>
							</div>
							<UiButton variant="solid" size="lg" full-width @click="finalizarPedido">
								Finalizar Pedido
							</UiButton>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
interface CartItem {
	id: number;
	nome: string;
	preco: string;
	imagem?: string;
	qtd: number;
}

const isCartOpen = ref(false);

// TODO: Criar a store do carrinho
const cartStore = {
	items: [] as CartItem[],
	qtdTotal: 0,
	total: 0,
	adicionar: () => {
		// Implementar quando criar a store
	},
	diminuir: () => {
		// Implementar quando criar a store
	},
	remover: () => {
		// Implementar quando criar a store
	},
};

const toggleCart = () => {
	isCartOpen.value = !isCartOpen.value;
};

const finalizarPedido = () => {
	// TODO: Implementar finalização (WhatsApp, etc)
	alert("Finalizar pedido - implementar depois!");
};
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
	transition: all 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
	opacity: 0;
}

.drawer-enter-from .relative,
.drawer-leave-to .relative {
	transform: translateX(100%);
}
</style>
