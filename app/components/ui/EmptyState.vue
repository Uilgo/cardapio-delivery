<template>
	<div class="flex flex-col items-center justify-center py-8 min-[400px]:py-10 sm:py-12 px-4">
		<!-- Icon/Emoji -->
		<div
			class="mb-3 min-[400px]:mb-3.5 sm:mb-4 text-5xl min-[400px]:text-[3.5rem] sm:text-6xl opacity-50"
		>
			<slot name="icon">
				{{ icon }}
			</slot>
		</div>

		<!-- Title -->
		<h3
			class="text-lg min-[400px]:text-xl sm:text-xl font-semibold text-gray-900 mb-2 text-center px-2"
		>
			<slot name="title">
				{{ title }}
			</slot>
		</h3>

		<!-- Description -->
		<p
			class="text-sm min-[400px]:text-[0.9375rem] sm:text-base text-gray-500 text-center max-w-md mb-4 min-[400px]:mb-5 sm:mb-6 px-2"
		>
			<slot name="description">
				{{ description }}
			</slot>
		</p>

		<!-- Action Button -->
		<slot name="action">
			<UiButton v-if="actionLabel" :variant="actionVariant" @click="$emit('action')">
				{{ actionLabel }}
			</UiButton>
		</slot>
	</div>
</template>

<script setup lang="ts">
interface Props {
	icon?: string;
	title?: string;
	description?: string;
	actionLabel?: string;
	actionVariant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
}

withDefaults(defineProps<Props>(), {
	icon: "📭",
	title: "Nada por aqui",
	description: "Não encontramos nenhum resultado.",
	actionLabel: "",
	actionVariant: "solid",
});

defineEmits<{
	action: [];
}>();
</script>
