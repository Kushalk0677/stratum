import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		host: "127.0.0.1",
		port: 5174,
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				features: resolve(__dirname, "features/index.html"),
				useCases: resolve(__dirname, "use-cases/index.html"),
				localModels: resolve(__dirname, "local-models/index.html"),
				download: resolve(__dirname, "download/index.html"),
			},
		},
	},
});
