<template>
	<div>
		<Header
			nome-estabelecimento="Meu Restaurante"
			descricao="Os melhores pratos da cidade"
			imagem-capa="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
			@ver-mais="showRestaurantInfo = true"
		/>

		<!-- Container com Layout Responsivo -->
		<div class="max-w-7xl mx-auto">
			<!-- Layout de 2 Colunas no Desktop -->
			<div class="md:grid md:grid-cols-[1fr_380px] md:gap-6 md:px-4 md:pt-6">
				<!-- Coluna Esquerda: Conteúdo Principal -->
				<div class="md:min-w-0">
					<div class="pt-4 md:pt-0">
						<CategoryFilter
							:categorias="categorias"
							:categoria-selecionada="categoriaSelecionada"
							@select="categoriaSelecionada = $event"
						/>
					</div>

					<SearchBar
						v-model="searchQuery"
						v-model:sort-by="sortBy"
						v-model:price-range="priceRange"
						v-model:em-promocao="emPromocao"
						v-model:destaques="destaques"
						:max-price="maxPrice"
						placeholder="Buscar produtos..."
						:sort-active="sortActive"
						:filter-active="filterActive"
						@sort="handleSort"
						@clear-filters="limparFiltros"
						@apply-filters="aplicarFiltros"
					/>

					<!-- Lista de Produtos -->
					<ProductList
						:produtos="produtosFiltrados"
						@add="adicionarAoCarrinho"
						@click="abrirDetalhes"
						@clear-filters="limparFiltros"
					/>
				</div>

				<!-- Coluna Direita: Carrinho (Desktop Only) -->
				<div class="hidden md:block">
					<Cart
						:items="cartItems"
						@increase="aumentarQuantidade"
						@decrease="diminuirQuantidade"
						@remove="removerDoCarrinho"
						@checkout="finalizarPedido"
					/>
				</div>
			</div>
		</div>

		<!-- Bottom Sheet de Detalhes do Produto -->
		<UiBottomSheet v-model="showDetails" title="Detalhes do Produto">
			<ProductDetails :produto="produtoSelecionado" />

			<template #footer>
				<UiButton variant="solid" size="lg" full-width @click="adicionarAoCarrinhoComQuantidade">
					<Icon name="lucide:shopping-cart" class="w-5 h-5 mr-2" />
					Adicionar ao Carrinho
				</UiButton>
			</template>
		</UiBottomSheet>

		<!-- Bottom Sheet de Informações do Restaurante -->
		<UiBottomSheet v-model="showRestaurantInfo" title="Informações">
			<RestaurantInfo />
		</UiBottomSheet>
	</div>
</template>

<script setup lang="ts">
import Header from "~/components/layouts/Header.vue";
import CategoryFilter from "~/components/cardapio/CategoryFilter.vue";
import SearchBar from "~/components/cardapio/SearchBar.vue";
import ProductList from "~/components/cardapio/ProductList.vue";
import ProductDetails from "~/components/cardapio/ProductDetails.vue";
import RestaurantInfo from "~/components/layouts/RestaurantInfo.vue";
import Cart from "~/components/cardapio/Cart.vue";
import { produtos as produtosMock, categorias as categoriasMock, type Produto } from "~/mocks";

/**
 * 📌 Página do Cardápio
 *
 * Página principal do cardápio com filtros, busca, ordenação e carrinho.
 * Layout responsivo: mobile (1 coluna) e desktop (2 colunas com carrinho fixo).
 */

interface CartItem extends Produto {
	quantidade: number;
}

definePageMeta({
	layout: "default",
});

const categoriaSelecionada = ref("Todos");
const searchQuery = ref("");
const sortBy = ref("name-asc");
const sortActive = ref(false);
const filterActive = ref(false);
const showDetails = ref(false);
const showRestaurantInfo = ref(false);
const produtoSelecionado = ref<Produto | null>(null);

// Filtros
const priceRange = ref<[number, number]>([0, 100]);
const emPromocao = ref(false);
const destaques = ref(false);
const maxPrice = ref(100);

const categorias = categoriasMock;
const produtos = ref(produtosMock);

// Carrinho de compras
const cartItems = ref<CartItem[]>([]);

// Produtos filtrados e ordenados
const produtosFiltrados = computed(() => {
	let resultado = produtos.value;

	// Filtrar por categoria
	if (categoriaSelecionada.value !== "Todos") {
		resultado = resultado.filter((p) => p.categoria === categoriaSelecionada.value);
	}

	// Filtrar por busca
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		resultado = resultado.filter(
			(p) => p.nome.toLowerCase().includes(query) || p.descricao?.toLowerCase().includes(query),
		);
	}

	// Filtrar por faixa de preço
	resultado = resultado.filter((p) => {
		const preco = typeof p.preco === "string" ? parseFloat(p.preco) : p.preco;
		return preco >= priceRange.value[0] && preco <= priceRange.value[1];
	});

	// Filtrar por promoção
	if (emPromocao.value) {
		resultado = resultado.filter((p) => p.emPromocao);
	}

	// Filtrar por destaques
	if (destaques.value) {
		resultado = resultado.filter((p) => p.destaque);
	}

	// Ordenar
	const sorted = [...resultado];
	switch (sortBy.value) {
		case "price-asc":
			sorted.sort((a, b) => {
				const precoA = typeof a.preco === "string" ? parseFloat(a.preco) : a.preco;
				const precoB = typeof b.preco === "string" ? parseFloat(b.preco) : b.preco;
				return precoA - precoB;
			});
			break;
		case "price-desc":
			sorted.sort((a, b) => {
				const precoA = typeof a.preco === "string" ? parseFloat(a.preco) : a.preco;
				const precoB = typeof b.preco === "string" ? parseFloat(b.preco) : b.preco;
				return precoB - precoA;
			});
			break;
		case "name-asc":
			sorted.sort((a, b) => a.nome.localeCompare(b.nome));
			break;
		case "name-desc":
			sorted.sort((a, b) => b.nome.localeCompare(a.nome));
			break;
		default:
			// Ordem alfabética por padrão
			sorted.sort((a, b) => a.nome.localeCompare(b.nome));
			break;
	}

	return sorted;
});

const handleSort = () => {
	sortActive.value = !sortActive.value;
};

const aplicarFiltros = () => {
	filterActive.value = true;
};

const abrirDetalhes = (produto: Produto) => {
	produtoSelecionado.value = produto;
	showDetails.value = true;
};

/**
 * Adiciona produto ao carrinho
 */
const adicionarAoCarrinho = (produto: Produto) => {
	const itemExistente = cartItems.value.find((item) => item.id === produto.id);

	if (itemExistente) {
		itemExistente.quantidade++;
	} else {
		cartItems.value.push({ ...produto, quantidade: 1 });
	}
};

/**
 * Adiciona produto ao carrinho com quantidade (via modal de detalhes)
 */
const adicionarAoCarrinhoComQuantidade = () => {
	if (produtoSelecionado.value) {
		adicionarAoCarrinho(produtoSelecionado.value);
		showDetails.value = false;
	}
};

/**
 * Aumenta quantidade de um item no carrinho
 */
const aumentarQuantidade = (id: number) => {
	const item = cartItems.value.find((item) => item.id === id);
	if (item) {
		item.quantidade++;
	}
};

/**
 * Diminui quantidade de um item no carrinho
 */
const diminuirQuantidade = (id: number) => {
	const item = cartItems.value.find((item) => item.id === id);
	if (item) {
		if (item.quantidade > 1) {
			item.quantidade--;
		} else {
			removerDoCarrinho(id);
		}
	}
};

/**
 * Remove item do carrinho
 */
const removerDoCarrinho = (id: number) => {
	const index = cartItems.value.findIndex((item) => item.id === id);
	if (index !== -1) {
		cartItems.value.splice(index, 1);
	}
};

/**
 * Finaliza o pedido
 */
const finalizarPedido = () => {
	if (cartItems.value.length === 0) return;

	// TODO: Implementar lógica de finalização (WhatsApp, pagamento, etc)
	alert("Pedido finalizado! (Implementar integração)");
};

const limparFiltros = () => {
	categoriaSelecionada.value = "Todos";
	searchQuery.value = "";
	priceRange.value = [0, 100];
	emPromocao.value = false;
	destaques.value = false;
	filterActive.value = false;
};
</script>
