<template>
	<div class="w-full overflow-x-auto scrollbar-hide">
		<div class="flex gap-2 px-3 py-3 min-[400px]:px-4 min-[400px]:py-3.5 sm:px-4 sm:py-4">
			<button
				v-for="categoria in categorias"
				:key="categoria"
				type="button"
				:class="[
					'px-3 py-1.5 min-[400px]:px-3.5 min-[400px]:py-2 sm:px-4 sm:py-2',
					'text-sm min-[400px]:text-[0.9375rem] sm:text-base leading-none',
					'rounded-lg whitespace-nowrap font-medium',
					'shrink-0 cursor-pointer',
					'inline-flex items-center justify-center',
					categoriaSelecionada === categoria
						? 'bg-[rgb(var(--ui-primary))] text-white shadow-md'
						: 'bg-white text-gray-700 border border-gray-200',
				]"
				style="
					transition:
						background-color 0.2s,
						color 0.2s,
						box-shadow 0.2s,
						border-color 0.2s;
				"
				@click="emit('select', categoria)"
			>
				{{ categoria }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * 📌 CategoryFilter Component
 *
 * Filtro horizontal de categorias com scroll nativo.
 * Use scroll do mouse ou touch para navegar.
 */

interface Props {
	categorias: string[];
	categoriaSelecionada?: string;
}

withDefaults(defineProps<Props>(), {
	categoriaSelecionada: "Todos",
});

const emit = defineEmits<{
	select: [categoria: string];
}>();
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
	display: none;
}

.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
	user-select: none;
}
</style>
