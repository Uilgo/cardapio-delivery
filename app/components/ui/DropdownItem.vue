<template>
	<button
		type="button"
		class="w-full px-3 py-2.5 text-left text-sm transition-colors flex items-center justify-between gap-3 rounded-md cursor-pointer"
		:class="
			active
				? 'bg-[rgb(var(--ui-primary))]/10 text-[rgb(var(--ui-primary))] font-medium'
				: 'text-[rgb(var(--ui-text-primary))] hover:bg-[rgb(var(--ui-bg-muted))]'
		"
		@click="handleClick"
	>
		<span>{{ label }}</span>
		<Icon v-if="active" name="lucide:check" class="w-5 h-5 text-[rgb(var(--ui-primary))]" />
	</button>
</template>

<script setup lang="ts">
interface Props {
	label: string;
	active?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
	click: [];
}>();

const handleClick = () => {
	emit("click");
};
</script>
