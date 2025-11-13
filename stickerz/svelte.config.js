import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { 
		output: {
			bundleStrategy: 'inline'
		},
		adapter: adapter(),
		router: {type:'hash'}
	},
	preprocess: [mdsvex(), vitePreprocess()],
	extensions: ['.svelte', '.svx']
};

export default config;
