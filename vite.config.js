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

	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `
	//           @import "./src/styles/_animations.scss";
	//           @import "./src/styles/_variables.scss";
	//           @import "./src/styles/_mixins.scss";
	//           @import "./src/styles/_helpers.scss";
	//         `
	// 		}
	// 	}
	// },

	resolve: {
		alias: [
			{ find: '@classes', replacement: '/src/classes' },
			{ find: '@shaders', replacement: '/src/shaders' },
			{ find: '@utils', replacement: '/src/utils' }
		]
	}
})
