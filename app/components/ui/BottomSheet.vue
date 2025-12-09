<template>
	<Teleport to="body">
		<Transition name="bottom-sheet">
			<div v-if="modelValue" class="fixed inset-0 z-50 flex items-end" @click.self="close">
				<!-- Overlay -->
				<div class="absolute inset-0 bg-black/50 transition-opacity" @click="close"></div>

				<!-- Bottom Sheet -->
				<div
					ref="sheetRef"
					class="relative w-full bg-white rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col"
					@touchstart="handleTouchStart"
					@touchmove="handleTouchMove"
					@touchend="handleTouchEnd"
				>
					<!-- Handle (risquinho) -->
					<div class="sticky top-0 z-10 bg-white rounded-t-2xl pt-3 pb-2 px-4">
						<div
							class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto cursor-grab active:cursor-grabbing"
							@mousedown="handleHandleMouseDown"
							@touchstart="handleHandleTouchStart"
						></div>
					</div>

					<!-- Header -->
					<div
						v-if="title"
						class="sticky top-[2.5rem] z-10 bg-white border-b px-4 py-3 flex items-center justify-between"
					>
						<h2 class="text-lg font-bold text-gray-900">{{ title }}</h2>
						<button
							type="button"
							class="p-2 hover:bg-[rgb(var(--ui-bg-muted))] rounded-full transition-colors cursor-pointer"
							@click="close"
						>
							<Icon name="lucide:x" class="w-5 h-5 text-[rgb(var(--ui-text-secondary))]" />
						</button>
					</div>

					<!-- Content (scrollable) -->
					<div
						ref="contentRef"
						class="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
						@scroll="handleScroll"
					>
						<slot></slot>
					</div>

					<!-- Footer (opcional) -->
					<div v-if="$slots.footer" class="sticky bottom-0 bg-white border-t px-4 py-3">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
interface Props {
	modelValue: boolean;
	title?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const sheetRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

let startY = 0;
let currentY = 0;
let isDragging = false;
let isAtTop = true;

const close = () => {
	emit("update:modelValue", false);
};

// Prevenir scroll da página quando o bottom sheet está aberto
watch(
	() => props.modelValue,
	(isOpen) => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	},
);

// Limpar ao desmontar
onUnmounted(() => {
	document.body.style.overflow = "";
});

// Verificar se está no topo do scroll
const handleScroll = () => {
	if (contentRef.value) {
		isAtTop = contentRef.value.scrollTop === 0;
	}
};

// Touch handlers para mobile (conteúdo)
const handleTouchStart = (e: TouchEvent) => {
	if (!isAtTop || !e.touches[0]) return; // Só permite arrastar se estiver no topo

	const target = e.target as HTMLElement;
	if (contentRef.value?.contains(target) && !isAtTop) return;

	startY = e.touches[0].clientY;
	isDragging = true;
};

// Touch handlers para o handle (sempre funciona)
const handleHandleTouchStart = (e: TouchEvent) => {
	if (!e.touches[0]) return;

	e.preventDefault();
	startY = e.touches[0].clientY;
	isDragging = true;

	const handleMove = (e: TouchEvent) => {
		if (!isDragging || !e.touches[0]) return;

		currentY = e.touches[0].clientY;
		const diff = currentY - startY;

		if (diff > 0 && sheetRef.value) {
			sheetRef.value.style.transform = `translateY(${diff}px)`;
		}
	};

	const handleEnd = () => {
		if (!isDragging) return;

		const diff = currentY - startY;

		if (sheetRef.value) {
			sheetRef.value.style.transform = "";
		}

		if (diff > 100) {
			close();
		}

		isDragging = false;
		startY = 0;
		currentY = 0;

		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	document.addEventListener("touchmove", handleMove);
	document.addEventListener("touchend", handleEnd);
};

const handleTouchMove = (e: TouchEvent) => {
	if (!isDragging || !isAtTop || !e.touches[0]) return;

	currentY = e.touches[0].clientY;
	const diff = currentY - startY;

	// Só permite arrastar pra baixo
	if (diff > 0 && sheetRef.value) {
		sheetRef.value.style.transform = `translateY(${diff}px)`;
	}
};

const handleTouchEnd = () => {
	if (!isDragging) return;

	const diff = currentY - startY;

	if (sheetRef.value) {
		sheetRef.value.style.transform = "";
	}

	// Se arrastou mais de 100px, fecha
	if (diff > 100) {
		close();
	}

	isDragging = false;
	startY = 0;
	currentY = 0;
};

// Mouse handlers para o handle (sempre funciona)
const handleHandleMouseDown = (e: MouseEvent) => {
	e.preventDefault();
	startY = e.clientY;
	isDragging = true;

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return;

		currentY = e.clientY;
		const diff = currentY - startY;

		if (diff > 0 && sheetRef.value) {
			sheetRef.value.style.transform = `translateY(${diff}px)`;
		}
	};

	const handleMouseUp = () => {
		if (!isDragging) return;

		const diff = currentY - startY;

		if (sheetRef.value) {
			sheetRef.value.style.transform = "";
		}

		if (diff > 100) {
			close();
		}

		isDragging = false;
		startY = 0;
		currentY = 0;

		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);
};
</script>

<style scoped>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
	transition: all 0.3s ease;
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
	opacity: 0;
}

.bottom-sheet-enter-from .relative,
.bottom-sheet-leave-to .relative {
	transform: translateY(100%);
}

.overscroll-contain {
	overscroll-behavior: contain;
}
</style>
