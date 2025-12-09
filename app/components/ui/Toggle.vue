<template>
	<button
		type="button"
		role="switch"
		:aria-checked="modelValue"
		:disabled="disabled"
		class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ui-primary))]/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
		:class="modelValue ? 'bg-[rgb(var(--ui-primary))]' : 'bg-gray-300 hover:bg-gray-400'"
		@click="toggle"
	>
		<span
			class="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200"
			:class="modelValue ? 'translate-x-6' : 'translate-x-0.5'"
		></span>
	</button>
</template>

<script setup lang="ts">
interface Props {
	modelValue: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const toggle = () => {
	emit("update:modelValue", !props.modelValue);
};
</script>
