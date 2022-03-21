import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: '8080',
		https: false,
		open: true
	},
	assetsInclude: ['**/*.gltf'],
	plugins: [glsl(), vue()],

	resolve: {
		alias: [
			{ find: '@classes', replacement: '/src/classes' },
			{ find: '@shaders', replacement: '/src/shaders' }
		]
	}
})
