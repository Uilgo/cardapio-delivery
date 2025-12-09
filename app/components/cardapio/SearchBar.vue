<template>
	<div class="w-full px-3 min-[400px]:px-4 py-3">
		<div class="flex items-center gap-2">
			<!-- Input de Pesquisa -->
			<div class="relative flex-1">
				<Icon
					name="lucide:search"
					class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 min-[400px]:w-5 min-[400px]:h-5"
				/>
				<input
					type="text"
					name="search"
					:value="modelValue"
					:placeholder="placeholder"
					class="w-full pl-9 min-[400px]:pl-10 pr-3 py-2 min-[400px]:py-2.5 text-sm min-[400px]:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ui-primary))]/20 focus:border-[rgb(var(--ui-primary))] transition-all"
					@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
				/>
			</div>

			<!-- Botão de Ordenação com Dropdown -->
			<UiDropdown>
				<template #trigger="{ isOpen }">
					<button
						type="button"
						class="p-2 min-[400px]:p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
						:class="{ 'bg-gray-50': isOpen || sortActive }"
					>
						<Icon
							name="lucide:arrow-up-down"
							class="w-5 h-5 min-[400px]:w-5.5 min-[400px]:h-5.5 text-gray-600"
						/>
					</button>
				</template>

				<template #default="{ close }">
					<UiDropdownItem
						label="Preço: Menor para Maior"
						:active="sortBy === 'price-asc'"
						@click="handleSort('price-asc', close)"
					/>
					<UiDropdownItem
						label="Preço: Maior para Menor"
						:active="sortBy === 'price-desc'"
						@click="handleSort('price-desc', close)"
					/>
					<UiDropdownItem
						label="A-Z (Alfabética)"
						:active="sortBy === 'name-asc'"
						@click="handleSort('name-asc', close)"
					/>
					<UiDropdownItem
						label="Z-A (Alfabética Reversa)"
						:active="sortBy === 'name-desc'"
						@click="handleSort('name-desc', close)"
					/>
				</template>
			</UiDropdown>

			<!-- Botão de Filtro com Dropdown -->
			<UiDropdown>
				<template #trigger="{ isOpen }">
					<button
						type="button"
						class="p-2 min-[400px]:p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
						:class="{ 'bg-gray-50': isOpen || filterActive }"
					>
						<Icon
							name="lucide:filter"
							class="w-5 h-5 min-[400px]:w-5.5 min-[400px]:h-5.5 text-gray-600"
						/>
					</button>
				</template>

				<template #default="{ close }">
					<FilterDropdown
						:price-range="priceRange"
						:em-promocao="emPromocao"
						:destaques="destaques"
						:max-price="maxPrice"
						@update:price-range="$emit('update:priceRange', $event)"
						@update:em-promocao="$emit('update:emPromocao', $event)"
						@update:destaques="$emit('update:destaques', $event)"
						@clear="handleClearFilters(close)"
						@apply="handleApplyFilters(close)"
					/>
				</template>
			</UiDropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import FilterDropdown from "~/components/cardapio/FilterDropdown.vue";

interface Props {
	modelValue?: string;
	placeholder?: string;
	sortBy?: string;
	sortActive?: boolean;
	filterActive?: boolean;
	priceRange?: [number, number];
	emPromocao?: boolean;
	destaques?: boolean;
	maxPrice?: number;
}

withDefaults(defineProps<Props>(), {
	modelValue: "",
	placeholder: "Buscar produtos...",
	sortBy: "name-asc",
	sortActive: false,
	filterActive: false,
	priceRange: () => [0, 100],
	emPromocao: false,
	destaques: false,
	maxPrice: 100,
});

const emit = defineEmits<{
	"update:modelValue": [value: string];
	"update:sortBy": [value: string];
	"update:priceRange": [value: [number, number]];
	"update:emPromocao": [value: boolean];
	"update:destaques": [value: boolean];
	sort: [];
	filter: [];
	clearFilters: [];
	applyFilters: [];
}>();

const handleSort = (value: string, close: () => void) => {
	emit("update:sortBy", value);
	emit("sort");
	close();
};

const handleClearFilters = (close: () => void) => {
	emit("clearFilters");
	close();
};

const handleApplyFilters = (close: () => void) => {
	emit("applyFilters");
	close();
};
</script>
