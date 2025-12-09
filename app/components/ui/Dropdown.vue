<template>
	<div ref="dropdownRef" class="relative">
		<!-- Trigger -->
		<div @click="toggle">
			<slot name="trigger" :is-open="isOpen"></slot>
		</div>

		<!-- Dropdown Menu -->
		<Teleport to="body">
			<Transition name="dropdown">
				<div
					v-if="isOpen"
					:style="dropdownStyle"
					class="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-1.5 min-w-[200px]"
				>
					<slot :close="close"></slot>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref({});

const toggle = () => {
	if (!isOpen.value) {
		calculatePosition();
	}
	isOpen.value = !isOpen.value;
};

const close = () => {
	isOpen.value = false;
};

const calculatePosition = () => {
	if (!dropdownRef.value) return;

	const rect = dropdownRef.value.getBoundingClientRect();
	const spaceBelow = window.innerHeight - rect.bottom;
	const spaceAbove = rect.top;
	const spaceRight = window.innerWidth - rect.right;
	const dropdownWidth = 200; // min-w-[200px]

	// Determinar posição vertical (acima ou abaixo)
	const isAbove = spaceBelow < 200 && spaceAbove > spaceBelow;

	// Determinar posição horizontal (esquerda ou direita)
	const alignRight = spaceRight < dropdownWidth;

	const style: Record<string, string> = {};

	// Posição vertical
	if (isAbove) {
		style.bottom = `${window.innerHeight - rect.top + 4}px`;
	} else {
		style.top = `${rect.bottom + 4}px`;
	}

	// Posição horizontal
	if (alignRight) {
		style.right = `${window.innerWidth - rect.right}px`;
	} else {
		style.left = `${rect.left}px`;
	}

	dropdownStyle.value = style;
};

// Fechar ao clicar fora
const handleClickOutside = (event: MouseEvent) => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
		close();
	}
};

watch(isOpen, (value) => {
	if (value) {
		document.addEventListener("click", handleClickOutside);
	} else {
		document.removeEventListener("click", handleClickOutside);
	}
});

onUnmounted(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
	transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
	opacity: 0;
	transform: translateY(-8px);
}
</style>
