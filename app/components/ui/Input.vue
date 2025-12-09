<template>
	<div class="w-full">
		<label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1">
			{{ label }}
			<span v-if="required" class="text-red-500">*</span>
		</label>

		<div class="relative">
			<input
				:id="inputId"
				:type="type"
				:value="modelValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:required="required"
				:class="inputClasses"
				@input="handleInput"
				@blur="$emit('blur', $event)"
				@focus="$emit('focus', $event)"
			/>

			<span v-if="error" class="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"> ⚠️ </span>
		</div>

		<p v-if="error" class="mt-1 text-sm text-red-500">
			{{ error }}
		</p>

		<p v-else-if="hint" class="mt-1 text-sm text-gray-500">
			{{ hint }}
		</p>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue?: string | number;
	type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	error?: string;
	hint?: string;
	size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "",
	type: "text",
	label: "",
	placeholder: "",
	disabled: false,
	required: false,
	error: "",
	hint: "",
	size: "md",
});

const emit = defineEmits<{
	"update:modelValue": [value: string];
	blur: [event: FocusEvent];
	focus: [event: FocusEvent];
}>();

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

const inputClasses = computed(() => {
	const base =
		"w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2";

	const state = props.error
		? "border-red-300 focus:border-red-500 focus:ring-red-200"
		: "border-gray-300 focus:border-primary focus:ring-primary/20";

	const sizes = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-5 py-3 text-lg",
	};

	const disabled = props.disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white";

	return [base, state, sizes[props.size], disabled].join(" ");
});

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit("update:modelValue", target.value);
};
</script>
