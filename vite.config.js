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
			{ find: '@classes', replacement: '/src/Experience' },
			{ find: '@scss', replacement: '/src/scss' },
			{ find: '@shaders', replacement: '/src/Experience/shaders' },
			{ find: '@utils', replacement: '/src/Experience/utils' }
		]
	},

	preprocessorOptions: {
		scss: {
			sassOptions: {
				outputStyle: 'compressed'
			}
		}
	}
})
