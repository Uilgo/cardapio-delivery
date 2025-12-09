<template>
	<div>
		<Header
			nome-estabelecimento="Meu Restaurante"
			descricao="Os melhores pratos da cidade"
			imagem-capa="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
			@ver-mais="showRestaurantInfo = true"
		/>

		<!-- Container centralizado com largura máxima -->
		<div class="max-w-4xl mx-auto">
			<div class="pt-4">
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
import { produtos as produtosMock, categorias as categoriasMock, type Produto } from "~/mocks";

definePageMeta({
	layout: "default",
});

const categoriaSelecionada = ref("Todos");
const searchQuery = ref("");
const sortBy = ref("popular");
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
		case "popular":
		case "recommended":
		default:
			// Manter ordem original (depois pode implementar lógica específica)
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

const adicionarAoCarrinho = (produto: Produto) => {
	// TODO: Integrar com a store do Pinia
	alert(`${produto.nome} adicionado ao carrinho!`);
};

const adicionarAoCarrinhoComQuantidade = () => {
	if (produtoSelecionado.value) {
		// TODO: Integrar com a store do Pinia (incluir quantidade)
		alert(`${produtoSelecionado.value.nome} adicionado ao carrinho!`);
		showDetails.value = false;
	}
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
