<template>
	<component
		:is="as"
		:class="[
			'inline-flex items-center justify-center gap-1.5 font-medium transition-all',
			variants[variant],
			sizes[size],
			rounded[roundedSize],
			clickable && 'cursor-pointer hover:opacity-80 active:scale-95',
			dot && 'gap-2',
			className,
		]"
		@click="handleClick"
	>
		<!-- Dot Indicator -->
		<span
			v-if="dot"
			:class="['w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant]]"
			aria-hidden="true"
		></span>

		<!-- Icon Slot (antes do texto) -->
		<span v-if="$slots.icon" class="shrink-0">
			<slot name="icon"></slot>
		</span>

		<!-- Conteúdo Principal -->
		<slot></slot>

		<!-- Close Button -->
		<button
			v-if="closable"
			type="button"
			:class="['shrink-0 hover:opacity-70 transition-opacity', closeButtonSizes[size]]"
			aria-label="Remover badge"
			@click.stop="$emit('close')"
		>
			<Icon name="lucide:x" :class="closeIconSizes[size]" />
		</button>
	</component>
</template>

<script setup lang="ts">
/**
 * 📌 Badge Component
 *
 * Componente de badge/tag reutilizável com múltiplas variantes.
 * Suporta ícones, dot indicator, botão de fechar e diferentes tamanhos.
 *
 * @prop {string} as - Elemento HTML a ser renderizado (default: 'span')
 * @prop {string} variant - Estilo visual do badge
 * @prop {string} size - Tamanho do badge
 * @prop {string} roundedSize - Arredondamento das bordas
 * @prop {boolean} dot - Exibir indicador de ponto
 * @prop {boolean} closable - Exibir botão de fechar
 * @prop {boolean} clickable - Tornar clicável
 * @prop {string} className - Classes CSS adicionais
 */

interface Props {
	as?: string;
	variant?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "error"
		| "info"
		| "neutral"
		| "outline";
	size?: "xs" | "sm" | "md" | "lg";
	roundedSize?: "sm" | "md" | "lg" | "full";
	dot?: boolean;
	closable?: boolean;
	clickable?: boolean;
	className?: string;
}

const props = withDefaults(defineProps<Props>(), {
	as: "span",
	variant: "default",
	size: "md",
	roundedSize: "full",
	dot: false,
	closable: false,
	clickable: false,
	className: "",
});

const emit = defineEmits<{
	click: [event: MouseEvent];
	close: [];
}>();

/**
 * Variantes visuais do badge
 */
const variants = {
	default:
		"bg-[rgb(var(--ui-bg-muted))] text-[rgb(var(--ui-text-primary))] border border-[rgb(var(--ui-border-base))]",
	primary:
		"bg-[rgb(var(--ui-primary))]/10 text-[rgb(var(--ui-primary))] border border-[rgb(var(--ui-primary))]/20",
	secondary:
		"bg-[rgb(var(--ui-secondary))]/10 text-[rgb(var(--ui-secondary))] border border-[rgb(var(--ui-secondary))]/20",
	success:
		"bg-[rgb(var(--ui-success))]/10 text-[rgb(var(--ui-success))] border border-[rgb(var(--ui-success))]/20",
	warning:
		"bg-[rgb(var(--ui-warning))]/10 text-[rgb(var(--ui-warning))] border border-[rgb(var(--ui-warning))]/20",
	error:
		"bg-[rgb(var(--ui-error))]/10 text-[rgb(var(--ui-error))] border border-[rgb(var(--ui-error))]/20",
	info: "bg-[rgb(var(--ui-info))]/10 text-[rgb(var(--ui-info))] border border-[rgb(var(--ui-info))]/20",
	neutral:
		"bg-[rgb(var(--ui-neutral))]/10 text-[rgb(var(--ui-neutral))] border border-[rgb(var(--ui-neutral))]/20",
	outline:
		"bg-transparent text-[rgb(var(--ui-text-primary))] border-2 border-[rgb(var(--ui-border-base))]",
};

/**
 * Cores do dot indicator
 */
const dotColors = {
	default: "bg-[rgb(var(--ui-text-secondary))]",
	primary: "bg-[rgb(var(--ui-primary))]",
	secondary: "bg-[rgb(var(--ui-secondary))]",
	success: "bg-[rgb(var(--ui-success))]",
	warning: "bg-[rgb(var(--ui-warning))]",
	error: "bg-[rgb(var(--ui-error))]",
	info: "bg-[rgb(var(--ui-info))]",
	neutral: "bg-[rgb(var(--ui-neutral))]",
	outline: "bg-[rgb(var(--ui-text-primary))]",
};

/**
 * Tamanhos do badge
 */
const sizes = {
	xs: "px-1.5 py-0.5 text-[10px] leading-tight",
	sm: "px-2 py-0.5 text-xs",
	md: "px-2.5 py-1 text-sm",
	lg: "px-3 py-1.5 text-base",
};

/**
 * Arredondamento das bordas
 */
const rounded = {
	sm: "rounded",
	md: "rounded-md",
	lg: "rounded-lg",
	full: "rounded-full",
};

/**
 * Tamanhos do botão de fechar
 */
const closeButtonSizes = {
	xs: "ml-0.5",
	sm: "ml-1",
	md: "ml-1",
	lg: "ml-1.5",
};

/**
 * Tamanhos do ícone de fechar
 */
const closeIconSizes = {
	xs: "w-2.5 h-2.5",
	sm: "w-3 h-3",
	md: "w-3.5 h-3.5",
	lg: "w-4 h-4",
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
