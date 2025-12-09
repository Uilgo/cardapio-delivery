<template>
	<div></div>
</template>

<script setup lang="ts">
/**
 * 📌 Página Index
 *
 * Redireciona automaticamente para a página do cardápio.
 * Esta é a página inicial da aplicação.
 */

definePageMeta({
	layout: false,
});

// Redireciona para o cardápio ao montar o componente
await navigateTo("/cardapio", { replace: true, redirectCode: 301 });
</script>
