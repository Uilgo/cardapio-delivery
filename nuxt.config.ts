// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: false },
	modules: ["@pinia/nuxt", "@nuxt/icon", "@nuxt/eslint", "@nuxt/image"],

	css: ["@/assets/css/main.css"],

	ssr: false,

	image: {
		// Provider padrão para otimização de imagens
		// Use 'ipx' para otimização automática ou 'none' para desabilitar
		format: ["webp"],
		quality: 80,
	},

	app: {
		head: {
			htmlAttrs: { lang: "pt-BR" },
			titleTemplate: "%s | Cardápio",
			title: "Início",
			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "format-detection", content: "telephone=no" },
				{ name: "description", content: "Descrição do site" },
				{ name: "color-scheme", content: "light" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},

	nitro: {
		compressPublicAssets: true,
		esbuild: {
			options: { target: "esnext" },
		},
		routeRules: {
			"/fonts/**": {
				headers: {
					"cache-control": "public, max-age=31536000, immutable",
					"access-control-allow-origin": "*",
				},
			},
			"/_nuxt/**": {
				headers: { "cache-control": "public, max-age=31536000, immutable" },
			},
		},
	},

	vite: {
		plugins: [tailwindcss()],
		build: {
			sourcemap: false,
			cssCodeSplit: true,
			rollupOptions: {
				output: {
					manualChunks: {
						"vue-vendor": ["vue", "@vue/runtime-dom"],
					},
				},
			},
		},
	},

	typescript: {
		strict: true,
		typeCheck: false,
		shim: false,
		tsConfig: {
			compilerOptions: {
				module: "esnext",
				moduleResolution: "bundler",
				target: "es2022",
				lib: ["dom", "dom.iterable", "es2022"],
			},
		},
	},
});
