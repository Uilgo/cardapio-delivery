<template>
	<div class="w-full">
		<!-- Labels -->
		<div class="flex items-center justify-between mb-3">
			<span class="text-sm font-medium text-gray-700">
				{{ formatValue(modelValue[0]) }}
			</span>
			<span class="text-sm text-gray-500">-</span>
			<span class="text-sm font-medium text-gray-700">
				{{ formatValue(modelValue[1]) }}
			</span>
		</div>

		<!-- Slider Container -->
		<div ref="sliderRef" class="relative h-2">
			<!-- Track Background -->
			<div class="absolute w-full h-2 bg-gray-200 rounded-full"></div>

			<!-- Track Active -->
			<div
				class="absolute h-2 bg-[rgb(var(--ui-primary))] rounded-full"
				:style="{
					left: `${((modelValue[0] - min) / (max - min)) * 100}%`,
					right: `${100 - ((modelValue[1] - min) / (max - min)) * 100}%`,
				}"
			></div>

			<!-- Thumb Min -->
			<div
				class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-[rgb(var(--ui-primary))] rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
				:style="{ left: `${((modelValue[0] - min) / (max - min)) * 100}%` }"
				@mousedown="(e) => startDrag(e, 0)"
				@touchstart="(e) => startDrag(e, 0)"
			></div>

			<!-- Thumb Max -->
			<div
				class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-[rgb(var(--ui-primary))] rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform"
				:style="{ left: `${((modelValue[1] - min) / (max - min)) * 100}%` }"
				@mousedown="(e) => startDrag(e, 1)"
				@touchstart="(e) => startDrag(e, 1)"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: [number, number];
	min?: number;
	max?: number;
	step?: number;
	// eslint-disable-next-line no-unused-vars
	formatValue?: (value: number) => string;
}

const props = withDefaults(defineProps<Props>(), {
	min: 0,
	max: 100,
	step: 1,
	formatValue: (value: number) => `R$ ${value}`,
});

const emit = defineEmits<{
	"update:modelValue": [value: [number, number]];
}>();

const sliderRef = ref<HTMLElement | null>(null);
let activeThumb: number | null = null;

const startDrag = (e: MouseEvent | TouchEvent, thumbIndex: number) => {
	e.preventDefault();
	activeThumb = thumbIndex;

	const handleMove = (e: MouseEvent | TouchEvent) => {
		if (activeThumb === null || !sliderRef.value) return;

		const rect = sliderRef.value.getBoundingClientRect();
		const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
		if (clientX === undefined) return;
		const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
		let newValue = props.min + percentage * (props.max - props.min);

		// Arredondar para o step
		newValue = Math.round(newValue / props.step) * props.step;

		const newRange: [number, number] = [...props.modelValue];

		if (activeThumb === 0) {
			// Thumb mínimo não pode passar do máximo
			newRange[0] = Math.min(newValue, props.modelValue[1] - props.step);
		} else {
			// Thumb máximo não pode passar do mínimo
			newRange[1] = Math.max(newValue, props.modelValue[0] + props.step);
		}

		emit("update:modelValue", newRange);
	};

	const handleEnd = () => {
		activeThumb = null;
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleEnd);
		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	document.addEventListener("mousemove", handleMove);
	document.addEventListener("mouseup", handleEnd);
	document.addEventListener("touchmove", handleMove);
	document.addEventListener("touchend", handleEnd);
};
</script>
