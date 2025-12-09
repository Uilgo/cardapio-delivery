<template>
	<component
		:is="as"
		:class="[
			'rounded-lg transition-all',
			variants[variant],
			padding[paddingSize],
			shadow && shadowSizes[shadowSize],
			hoverable && 'hover:shadow-md cursor-pointer',
			clickable && 'cursor-pointer active:scale-[0.98]',
			className,
		]"
		@click="handleClick"
	>
		<!-- Header Slot -->
		<div v-if="$slots.header" class="border-b border-[rgb(var(--ui-border-base))] pb-3 mb-3">
			<slot name="header"></slot>
		</div>

		<!-- Default Content Slot -->
		<slot></slot>

		<!-- Footer Slot -->
		<div v-if="$slots.footer" class="border-t border-[rgb(var(--ui-border-base))] pt-3 mt-3">
			<slot name="footer"></slot>
		</div>
	</component>
</template>

<script setup lang="ts">
/**
 * 📌 Card Component
 *
 * Componente de card reutilizável com múltiplas variantes e slots.
 * Suporta header, footer, diferentes estilos e tamanhos de padding/shadow.
 *
 * @prop {string} as - Elemento HTML a ser renderizado (default: 'div')
 * @prop {string} variant - Estilo visual do card
 * @prop {string} paddingSize - Tamanho do padding interno
 * @prop {boolean} shadow - Exibir sombra
 * @prop {string} shadowSize - Tamanho da sombra
 * @prop {boolean} hoverable - Adicionar efeito hover
 * @prop {boolean} clickable - Tornar clicável com feedback visual
 * @prop {string} className - Classes CSS adicionais
 */

interface Props {
	as?: string;
	variant?: "default" | "outline" | "ghost" | "elevated" | "bordered" | "flat";
	paddingSize?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
	shadow?: boolean;
	shadowSize?: "sm" | "md" | "lg" | "xl";
	hoverable?: boolean;
	clickable?: boolean;
	className?: string;
}

const props = withDefaults(defineProps<Props>(), {
	as: "div",
	variant: "default",
	paddingSize: "md",
	shadow: true,
	shadowSize: "sm",
	hoverable: false,
	clickable: false,
	className: "",
});

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

/**
 * Variantes visuais do card
 */
const variants = {
	default: "bg-white border border-[rgb(var(--ui-border-base))]",
	outline: "bg-transparent border-2 border-[rgb(var(--ui-border-base))]",
	ghost: "bg-[rgb(var(--ui-bg-muted))] border border-[rgb(var(--ui-border-muted))]",
	elevated: "bg-white border-0",
	bordered: "bg-white border-2 border-[rgb(var(--ui-primary))]/20",
	flat: "bg-[rgb(var(--ui-bg-subtle))] border-0",
};

/**
 * Tamanhos de padding
 */
const padding = {
	none: "",
	xs: "p-2",
	sm: "p-3",
	md: "p-4",
	lg: "p-5 min-[400px]:p-6",
	xl: "p-6 min-[400px]:p-8",
};

/**
 * Tamanhos de sombra
 */
const shadowSizes = {
	sm: "shadow-sm",
	md: "shadow-md",
	lg: "shadow-lg",
	xl: "shadow-xl",
};

/**
 * Handler de clique - emite evento apenas se clickable
 */
const handleClick = (event: MouseEvent) => {
	if (props.clickable) {
		emit("click", event);
	}
};
</script>
