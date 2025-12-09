<template>
	<div
		ref="container"
		class="w-full overflow-x-auto scrollbar-hide"
		:class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
		@mousedown="onMouseDown"
		@click="onContainerClick"
	>
		<div class="flex gap-2 px-3 py-3 min-[400px]:px-4 min-[400px]:py-3.5 sm:px-4 sm:py-4">
			<button
				v-for="categoria in categorias"
				:key="categoria"
				type="button"
				:class="[
					'px-3 py-1.5 min-[400px]:px-3.5 min-[400px]:py-2 sm:px-4 sm:py-2',
					'text-sm min-[400px]:text-[0.9375rem] sm:text-base',
					'rounded-full whitespace-nowrap font-medium',
					'transition-all duration-200 shrink-0',
					'pointer-events-none',
					categoriaSelecionada === categoria
						? 'bg-[rgb(var(--ui-primary))] text-white shadow-md'
						: 'bg-white text-gray-700 border border-gray-200',
				]"
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
 * Filtro horizontal de categorias com drag-to-scroll.
 * Clique e arraste para navegar pelas categorias.
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

const container = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const moved = ref(false);

const onMouseDown = (e: MouseEvent) => {
	if (!container.value) return;

	isDragging.value = true;
	moved.value = false;
	startX.value = e.pageX - container.value.offsetLeft;
	scrollLeft.value = container.value.scrollLeft;

	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
	if (!isDragging.value || !container.value) return;

	e.preventDefault();
	moved.value = true;

	const x = e.pageX - container.value.offsetLeft;
	const walk = (x - startX.value) * 1.5;
	container.value.scrollLeft = scrollLeft.value - walk;
};

const onMouseUp = () => {
	isDragging.value = false;
	document.removeEventListener("mousemove", onMouseMove);
	document.removeEventListener("mouseup", onMouseUp);
};

const onContainerClick = (e: MouseEvent) => {
	if (!moved.value && e.target instanceof HTMLButtonElement) {
		const categoria = e.target.textContent?.trim();
		if (categoria) {
			emit("select", categoria);
		}
	}
};

onUnmounted(() => {
	document.removeEventListener("mousemove", onMouseMove);
	document.removeEventListener("mouseup", onMouseUp);
});
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
