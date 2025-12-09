<template>
	<div class="space-y-4 pb-4">
		<!-- Contato -->
		<div class="space-y-3">
			<a
				v-if="contato.telefone"
				:href="`tel:${contato.telefone}`"
				class="flex items-center gap-3 text-gray-600 hover:text-[rgb(var(--ui-primary))] transition-colors cursor-pointer"
			>
				<Icon name="lucide:phone" class="w-5 h-5 text-gray-400" />
				<span class="text-base">{{ contato.telefone }}</span>
			</a>

			<a
				v-if="contato.whatsapp"
				:href="`https://wa.me/${contato.whatsapp.replace(/\D/g, '')}`"
				target="_blank"
				class="flex items-center gap-3 text-gray-600 hover:text-[rgb(var(--ui-primary))] transition-colors cursor-pointer"
			>
				<Icon name="lucide:message-circle" class="w-5 h-5 text-gray-400" />
				<span class="text-base">{{ contato.whatsapp }}</span>
			</a>

			<a
				v-if="contato.email"
				:href="`mailto:${contato.email}`"
				class="flex items-center gap-3 text-gray-600 hover:text-[rgb(var(--ui-primary))] transition-colors cursor-pointer"
			>
				<Icon name="lucide:mail" class="w-5 h-5 text-gray-400" />
				<span class="text-base">{{ contato.email }}</span>
			</a>
		</div>

		<!-- Horários -->
		<section class="pt-2">
			<h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
				<Icon name="lucide:clock" class="w-5 h-5 text-[rgb(var(--ui-primary))]" />
				Horários de Funcionamento
			</h3>
			<Card variant="ghost" padding-size="md" :shadow="true">
				<div class="space-y-3">
					<div
						v-for="(horario, index) in horarios"
						:key="index"
						class="flex justify-between items-center"
					>
						<span class="text-gray-800 font-medium">{{ horario.dia }}</span>
						<span class="text-gray-700">{{ horario.horario }}</span>
					</div>
				</div>
			</Card>
		</section>

		<!-- Formas de Pagamento -->
		<section class="pt-2">
			<h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
				<Icon name="lucide:credit-card" class="w-5 h-5 text-[rgb(var(--ui-primary))]" />
				Formas de Pagamento
			</h3>
			<div class="flex flex-wrap gap-2">
				<Badge
					v-for="(pagamento, index) in formasPagamento"
					:key="index"
					variant="default"
					size="md"
				>
					{{ pagamento }}
				</Badge>
			</div>
		</section>

		<!-- Sobre -->
		<section v-if="sobre" class="pt-2">
			<h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
				<Icon name="lucide:info" class="w-5 h-5 text-[rgb(var(--ui-primary))]" />
				Sobre
			</h3>
			<p class="text-gray-600 leading-relaxed">
				{{ sobre }}
			</p>
		</section>

		<!-- Endereço -->
		<section v-if="endereco" class="pt-2">
			<h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
				<Icon name="lucide:map-pin" class="w-5 h-5 text-[rgb(var(--ui-primary))]" />
				Endereço
			</h3>
			<Card variant="ghost" padding-size="md" :shadow="true">
				<div class="space-y-1">
					<p class="text-gray-800">{{ endereco.rua }}</p>
					<p class="text-gray-700 text-sm">{{ endereco.cidade }} - {{ endereco.estado }}</p>
					<p v-if="endereco.cep" class="text-gray-700 text-sm">CEP: {{ endereco.cep }}</p>
				</div>
			</Card>
		</section>
	</div>
</template>

<script setup lang="ts">
import Card from "~/components/ui/Card.vue";
import Badge from "~/components/ui/Badge.vue";

interface Endereco {
	rua: string;
	cidade: string;
	estado: string;
	cep?: string;
}

interface Contato {
	telefone?: string;
	whatsapp?: string;
	email?: string;
}

interface Horario {
	dia: string;
	horario: string;
}

interface Props {
	sobre?: string;
	endereco?: Endereco;
	contato?: Contato;
	horarios?: Horario[];
	formasPagamento?: string[];
}

withDefaults(defineProps<Props>(), {
	sobre:
		"Bem-vindo ao nosso restaurante! Oferecemos os melhores pratos da cidade com ingredientes frescos e de qualidade. Nossa equipe está sempre pronta para proporcionar a melhor experiência gastronômica.",
	endereco: () => ({
		rua: "Rua Exemplo, 123 - Centro",
		cidade: "São Paulo",
		estado: "SP",
		cep: "01234-567",
	}),
	contato: () => ({
		telefone: "(11) 1234-5678",
		whatsapp: "(11) 91234-5678",
		email: "contato@restaurante.com",
	}),
	horarios: () => [
		{ dia: "Segunda a Sexta", horario: "11:00 - 23:00" },
		{ dia: "Sábado", horario: "11:00 - 00:00" },
		{ dia: "Domingo", horario: "11:00 - 22:00" },
	],
	formasPagamento: () => [
		"Dinheiro",
		"Cartão de Crédito",
		"Cartão de Débito",
		"PIX",
		"Vale Refeição",
	],
});
</script>
