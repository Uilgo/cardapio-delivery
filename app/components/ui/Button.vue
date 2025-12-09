<template>
	<button
		:type="type"
		:disabled="disabled || loading"
		:class="buttonClasses"
		@click="$emit('click', $event)"
	>
		<span v-if="loading" class="animate-spin mr-2">⏳</span>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
interface Props {
	variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
	size?: "sm" | "md" | "lg";
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: "solid",
	size: "md",
	type: "button",
	disabled: false,
	loading: false,
	fullWidth: false,
});

defineEmits<{
	click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
	const base =
		"inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

	const variants = {
		solid: "bg-[rgb(var(--ui-primary))] text-white hover:opacity-90 active:scale-95 shadow-sm",
		outline:
			"border-2 border-[rgb(var(--ui-primary))] text-[rgb(var(--ui-primary))] hover:bg-[rgb(var(--ui-primary))] hover:text-white",
		soft: "bg-[rgb(var(--ui-primary))]/10 text-[rgb(var(--ui-primary))] hover:bg-[rgb(var(--ui-primary))]/20",
		subtle: "bg-gray-100 text-gray-700 hover:bg-gray-200",
		ghost: "text-[rgb(var(--ui-primary))] hover:bg-[rgb(var(--ui-primary))]/10",
		link: "text-[rgb(var(--ui-primary))] hover:underline underline-offset-4",
	};

	const sizes = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const width = props.fullWidth ? "w-full" : "";

	return [base, variants[props.variant], sizes[props.size], width].join(" ");
});
</script>
