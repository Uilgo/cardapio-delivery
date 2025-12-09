<template>
	<div class="space-y-6 p-2">
		<!-- Faixa de Preço -->
		<div>
			<h3 class="text-base font-bold text-gray-900 mb-4">Faixa de Preço</h3>
			<RangeSlider
				:model-value="priceRange"
				:min="0"
				:max="maxPrice"
				:step="1"
				:format-value="formatPrice"
				@update:model-value="$emit('update:priceRange', $event)"
			/>
		</div>

		<!-- Em Promoção -->
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium text-gray-700">Em Promoção</span>
			<Toggle :model-value="emPromocao" @update:model-value="$emit('update:emPromocao', $event)" />
		</div>

		<!-- Destaques da Casa -->
		<div class="flex items-center justify-between">
			<span class="text-sm font-medium text-gray-700">Destaques da Casa</span>
			<Toggle :model-value="destaques" @update:model-value="$emit('update:destaques', $event)" />
		</div>

		<!-- Botões -->
		<div class="flex gap-3 pt-2">
			<Button type="button" variant="outline" size="md" full-width @click="$emit('clear')">
				Limpar
			</Button>
			<Button type="button" variant="solid" size="md" full-width @click="$emit('apply')">
				Aplicar
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
import Toggle from "~/components/ui/Toggle.vue";
import RangeSlider from "~/components/ui/RangeSlider.vue";
import Button from "~/components/ui/Button.vue";
interface Props {
	priceRange: [number, number];
	emPromocao: boolean;
	destaques: boolean;
	maxPrice?: number;
}

withDefaults(defineProps<Props>(), {
	maxPrice: 100,
});

defineEmits<{
	"update:priceRange": [value: [number, number]];
	"update:emPromocao": [value: boolean];
	"update:destaques": [value: boolean];
	clear: [];
	apply: [];
}>();

const formatPrice = (value: number) => {
	if (value >= 100) return "R$ 100+";
	return `R$ ${value}`;
};
</script>
